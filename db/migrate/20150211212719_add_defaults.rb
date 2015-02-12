class AddDefaults < ActiveRecord::Migration
  def change
    change_column :stories, :kudos_count, :integer, :default => 0
    change_column :stories, :hits, :integer, :default => 0
  end
end
