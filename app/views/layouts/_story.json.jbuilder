json.(story, :id, :title, :text, :summary, :notes, :word_count, :hits, :created_at, :updated_at)

json.kudos story.kudos_count

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

json.kudos_users story.kudos_users do |user|
  json.username user.username
end

if current_user_needed && current_user

  json.current_user do
    json.username current_user.username
    json.id current_user.id
  end

end
