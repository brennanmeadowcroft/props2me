class UserDetailSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :position, :goal_count
  has_many :goals
  has_many :badges

  def goal_count
    object.goals.count
  end
end
