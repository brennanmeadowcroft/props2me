class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  has_many :goals
  has_and_belongs_to_many :badges
  has_many :props_users
  has_many :props, through: :props_users
  has_many :api_key

  has_secure_password

  before_save :init

  private
    def init
      self.active ||= 0
      self.admin ||= 0
      self.vanity_url = self.first_name.downcase + '-' + self.last_name.downcase
    end
end
