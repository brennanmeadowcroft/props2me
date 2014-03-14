json.array!(@props) do |prop|
  json.extract! prop, :id
  json.url prop_url(prop, format: :json)
end
