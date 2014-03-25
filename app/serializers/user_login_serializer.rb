class UserLoginSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :position, :admin, :user_api_key, :vanity_url

  def user_api_key
    object.api_key.first
  end
end
