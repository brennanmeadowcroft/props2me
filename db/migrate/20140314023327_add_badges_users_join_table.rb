class AddBadgesUsersJoinTable < ActiveRecord::Migration
  def up
    create_table :badges_users do |t|
      t.integer :badge_id
      t.integer :user_id
    end
  end
  def down
    drop_table :badges_users
  end
end
