class AddCompleteFlagToGoals < ActiveRecord::Migration
  def up
    add_column :goals, :complete_flag, :integer
  end

  def down
    remove_column :goals, :complete_flag
  end
end
