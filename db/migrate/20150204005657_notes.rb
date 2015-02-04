class Notes < ActiveRecord::Migration
  def change

    add_column :stories, :notes, :string

  end
end
