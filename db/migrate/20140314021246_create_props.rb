class CreateProps < ActiveRecord::Migration
  def up
    create_table :props do |t|
      t.integer :goal_id
      t.string :comments
      t.timestamps
    end
  end

  def down
    drop_table :props
  end
end
