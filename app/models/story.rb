class Story < ActiveRecord::Base

  validates :text, :title, presence: true

  after_initialize :generate_word_count

  private

    def generate_word_count
      self.word_count = text.split.length
    end

end
