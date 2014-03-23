class ChangeExpirationDateToDatetime < ActiveRecord::Migration
  def up
    change_column :api_keys, :expiration_date, :datetime
  end
  def down
    change_column :api_keys, :expiration_date, :date
  end
end
