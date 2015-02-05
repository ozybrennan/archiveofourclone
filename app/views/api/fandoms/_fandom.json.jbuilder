json.(fandom, :name, :category)

json.stories fandom.stories do |story|
  json.partial! 'layouts/story', story: story
end
