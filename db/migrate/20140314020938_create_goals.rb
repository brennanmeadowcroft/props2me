class CreateGoals < ActiveRecord::Migration
  def up
    create_table :goals do |t|
      t.integer :user_id
      t.string :name
      t.string :description
      t.timestamps
    end
  end

  def down
    drop_table :goals
  end
end
