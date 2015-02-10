json.(user, :id, :username, :created_at)

json.stories user.stories do |story|
  json.partial! 'layouts/story', story: story, current_user_needed: false
end

if current_user_needed && current_user

  json.current_user do
    json.id current_user.id
    json.username current_user.username
  end

end
