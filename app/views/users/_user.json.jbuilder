json.(user, :id, :username, :created_at)

json.stories user.stories do |story|
  json.partial! 'layouts/story', story: story
end
