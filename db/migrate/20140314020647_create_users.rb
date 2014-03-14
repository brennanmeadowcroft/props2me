class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :position
      t.string :email
      t.integer :active

      t.timestamps
    end

    add_index :users, :email, unique: true
  end

  def down
    drop_table :users
  end
end
