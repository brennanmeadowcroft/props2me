class ApiKey < ActiveRecord::Base
  before_create :generate_access_token
  before_create :set_expiration_date

  # For now, I don't care about api_keys that expired prior to today
#  default_scope { where("expiration_date > ?", Time.now) }

  belongs_to :user

  def self.verify_access_token(token)
    key = ApiKey.find_by_access_token(token)

    if key and Time.now < key.expiration_date
      return true
    else
      return false
    end
  end

  def expire_token
    self.expiration_date = 1.day.ago
    self.save!
  end

  private
    def generate_access_token
      begin
        self.access_token = SecureRandom.hex
      end while self.class.exists?(access_token: access_token)
    end

    def set_expiration_date
      self.expiration_date = 5.days.from_now
    end
end
