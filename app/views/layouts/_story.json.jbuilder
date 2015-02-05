json.(story, :id, :title, :text, :summary, :notes, :word_count, :created_at, :updated_at)

json.author do
  json.username story.user.username
  json.id story.user.id
end

json.fandom do
  json.name story.fandom.name
  json.id story.fandom.id
end

json.tags story.tags do |tag|
  json.label tag.label
  json.category tag.category
end
