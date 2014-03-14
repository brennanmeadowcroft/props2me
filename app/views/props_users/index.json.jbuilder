json.array!(@props_users) do |props_user|
  json.extract! props_user, :id
  json.url props_user_url(props_user, format: :json)
end
