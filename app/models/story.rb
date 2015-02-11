class Story < ActiveRecord::Base

  validates :text, :title, presence: true

  after_initialize :generate_word_count

  belongs_to :user
  belongs_to :fandom

  has_many :taggings
  has_many :tags, through: :taggings
  has_many :kudos
  has_many :kudos_users, through: :kudos, source: :user

  default_scope { order("created_at") }

  def self.find_by_tags(tags)
    tags = self.parse_tags(tags)
    story_ids = []
    if tags["fandom_name"]
      fandom = Fandom.find_by_name(tags["fandom_name"][0])
      story_ids = self.filter_story_ids(story_ids, fandom)
      tags.delete("fandom_name")
    end
    if tags["author_name"]
      author = Users.find_by_username(tags["author_name"][0])
      story_ids = self.filter_story_ids(story_ids, author)
      tags.delete("author_name")
    end
    tags.each do |category, labels|
      labels.each do |label|
        tag = Tag.where("category = ? AND label = ?", category, label).first
        story_ids = self.filter_story_ids(story_ids, tag)
      end
    end

    Story.find(story_ids)

  end

  def self.filter_story_ids(story_ids, filter)
    if story_ids.empty?
      filter.stories.each {|story| story_ids.push(story.id)}
    else
      filter_ids = []
      filter.stories.each {|story| filter_ids.push(story.id)}
      story_ids.keep_if { |id| filter_ids.include?(id)}
    end
    return story_ids
  end

  def self.parse_tags(tags)
    tags_arr = tags.split("/")
    tags = {}

    tags_arr.each_with_index do |type, i|
      if i % 2 == 0
        tag = tags_arr[i + 1]
        if tags[type]
          tags[type].push(tag)
        else
          tags[type] = [tag]
        end
      end
    end

    tags
  end

  def process_attributes(story_params)

    story_attributes = {}

    story_attributes[:title] = story_params[:title]
    story_attributes[:summary] = story_params[:summary]
    story_attributes[:notes] = story_params[:notes]
    story_attributes[:kudos_count] = story_params[:kudos_count]
    story_attributes[:hits] = story_params[:hits]

    if !story_params[:fandom].nil?
      fandom = Fandom.find_by_name(story_params[fandom])
      if fandom.nil?
        fandom = Fandom.create({ name: fandom, category: story_params[:genre] })
      end
      story_attributes[:fandom_id] = fandom.id
    end

    if story_params.include?(:kudos_count) && current_user
      if story_params[:kudos_count] > self.kudos
        Kudos.create(user_id: current_user.id, story_id: self.id)
      else
        @kudos = Kudos.where(user_id: current_user.id, story_id: self.id).take
        @kudos.destroy
      end
    end

    [:warnings, :ratings, :categories, :characters, :relationships, :additional].each do |type|
      self.process_tag(type, story_params[type]) if !story_params[type].nil?
    end

    story_attributes
  end

  def process_tag(type, labels)
    labels.each do |label|
      tag = Tag.where("label = ? AND category = ?", label, type).first
      if tag.nil?
        tag = Tag.create({label: label, category: type.to_s.capitalize})
      end
      Tagging.create({story_id: self.id, tag_id: tag.id})
    end
  end

  private

    def generate_word_count
      self.word_count = text.split.length
    end

end
