class PropSerializer < ActiveModel::Serializer
  attributes :id, :comments, :provider

  def recipient
    object.users.where("props_users.recipient_flag=1")
  end
  def provider
    object.users.where("props_users.recipient_flag=0")
  end
end
