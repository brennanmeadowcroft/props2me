class PropsUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :prop
end
