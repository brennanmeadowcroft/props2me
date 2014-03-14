class CreatePropsUsers < ActiveRecord::Migration
  def up
    create_table :props_users do |t|
      t.integer :user_id
      t.integer :prop_id
      t.integer :anonymous_flag
      t.integer :recipient_flag
      t.timestamps
    end
  end
  def down
    drop_table :props_users
  end
end
