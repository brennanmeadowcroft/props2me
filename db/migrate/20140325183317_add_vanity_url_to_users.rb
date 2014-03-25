class AddVanityUrlToUsers < ActiveRecord::Migration
  def up
    add_column :users, :vanity_url, :string
  end
  def down
    remove_column :users, :vanity_url
  end
end
