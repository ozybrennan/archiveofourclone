class Kudos < ActiveRecord::Migration
  def change
    add_column :stories, :kudos, :integer
    add_column :stories, :hits, :integer
  end
end
