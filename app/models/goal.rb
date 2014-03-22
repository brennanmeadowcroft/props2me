class Goal < ActiveRecord::Base
  belongs_to :user
  has_many :props
  before_save :init

  private
    def init
      self.description ||= self.name
      self.complete_flag ||= 0
    end
end
