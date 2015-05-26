class Story < ActiveRecord::Base

  attr_accessor :fandom_name

  validates :text, :title, presence: true
  validate :must_have_fandom

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
      return [] if story_ids.empty?
    end
    if tags["author_name"]
      author = User.find_by_username(tags["author_name"][0])
      story_ids = self.filter_story_ids(story_ids, author)
      tags.delete("author_name")
      return [] if story_ids.empty?
    end
    tags.each do |category, labels|
      labels.each do |label|
        if category == "all"
          all_tags = Tag.where("label = ?", label)
          all_ids = []
          all_tags.each do |tag|
            tag_ids = self.filter_story_ids(story_ids, tag)
            all_ids = all_ids.concat(tag_ids).uniq
          end
          story_ids = all_ids
        else
          tag = Tag.where("category = ? AND label = ?", category, label).first
          story_ids = self.filter_story_ids(story_ids, tag)
        end
        return [] if story_ids.empty?
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

  def self.sort(stories, criterion)
    if criterion == "kudos"
      sorted_stories = stories.sort_by { |story| story.kudos_count }.reverse
    elsif criterion == "author_name"
      sorted_stories = stories.sort_by { |story| story.user.username}
    elsif criterion == "hits" || criterion == "word_count"
      sorted_stories = stories.sort_by { |story| story.attributes[criterion] }.reverse
    else
      sorted_stories = stories.sort_by { |story| story.attributes[criterion] }
    end
    sorted_stories
  end

  def process_attributes(story_params, current_user)

    story_attributes = {}

    [:title, :summary, :notes, :kudos_count, :hits].each do |type|
      story_attributes[type] = story_params[type] if story_params[type]
    end

    if !story_params[:fandom].nil?
      fandom = Fandom.find_by_name(story_params[fandom])
      if fandom.nil?
        fandom = Fandom.create({ name: fandom, category: story_params[:genre] })
      end
      story_attributes[:fandom_id] = fandom.id
    end

    if story_params.include?(:kudos_count) && current_user
      if story_params[:kudos_count] > self.kudos_count
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

    def must_have_fandom
      unless (fandom_name && fandom_name != "") || fandom_id
        errors.add(:fandom, "can't be blank")
      end
    end

end
