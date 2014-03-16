class PropsUserSerializer < ActiveModel::Serializer
  attributes :id, :recipient_name, :giving_name

  def recipient_name
    object.users.where(:recipient => 1)
  end
  def giving_name
    object.users.where(:recipient => 0)
  end
end
