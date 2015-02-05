class Changenotes < ActiveRecord::Migration
  def change
    change_column :stories, :notes, :text
  end
end
