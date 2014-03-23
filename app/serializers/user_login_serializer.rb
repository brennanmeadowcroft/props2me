class UserLoginSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :position, :user_api_key

  def user_api_key
    object.api_key.first
  end
end
