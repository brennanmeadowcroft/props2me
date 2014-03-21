class CreateApiKeys < ActiveRecord::Migration
  def up
    create_table :api_keys do |t|
      t.string :access_token
      t.integer :user_id
      t.date :expiration_date
      t.timestamps
    end
  end

  def down
    drop_table :api_keys
  end
end
