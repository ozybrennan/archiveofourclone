class CreateFandoms < ActiveRecord::Migration
  def change
    create_table :fandoms do |t|
      t.string :name
      t.string :category

      t.timestamps
    end
    add_column :stories, :fandom_id, :integer
  end
end
