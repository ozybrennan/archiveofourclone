class Story < ActiveRecord::Base

  validates :text, :title, presence: true

  after_initialize :generate_word_count

  belongs_to :user
  belongs_to :fandom

  has_many :taggings
  has_many :tags, through: :taggings

  private

    def generate_word_count
      self.word_count = text.split.length
    end

end
