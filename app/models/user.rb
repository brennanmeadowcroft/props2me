class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  has_many :goals
  has_many :badges
  has_many :props_users
  has_many :props, through: :props_users
end
