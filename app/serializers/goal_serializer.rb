class GoalSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at, :props_count
  has_many :props

  def props_count
    object.props.count
  end
end
