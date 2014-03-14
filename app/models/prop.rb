class Prop < ActiveRecord::Base
  belongs_to :goals
  has_many :props_users
  has_many :users, through: :props_users
end
