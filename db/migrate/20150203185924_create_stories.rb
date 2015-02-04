class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title, null: false
      t.text :summary
      t.text :text, null: false
      t.integer :word_count

      t.timestamps
    end

    add_index :stories, :word_count
    add_index :stories, :created_at
    add_index :stories, :updated_at

  end
end
