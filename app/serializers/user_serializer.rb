class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :position, :admin, :vanity_url
end
