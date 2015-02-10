class RenameKudos < ActiveRecord::Migration
  def change
    rename_column :stories, :kudos, :kudos_count
  end
end
