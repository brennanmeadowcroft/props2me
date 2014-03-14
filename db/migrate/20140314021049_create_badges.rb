class CreateBadges < ActiveRecord::Migration
  def up
    create_table :badges do |t|
      t.string :name
      t.string :description
      t.timestamps
    end
  end

  def down
    drop_table :badges
  end
end
