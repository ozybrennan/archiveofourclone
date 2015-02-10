class CreateKudos < ActiveRecord::Migration
  def change
    create_table :kudos do |t|
      t.integer :user_id
      t.integer :story_id
      
      t.timestamps
    end
  end
end
