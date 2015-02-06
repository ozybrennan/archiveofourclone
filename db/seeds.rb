# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
20.times do
  username = Faker::Internet.user_name
  User.create(username: username, password: "password")
end

100.times do
  title = Faker::Lorem.sentence
  summary = Faker::Lorem.paragraph(rand(5))
  notes = Faker::Lorem.paragraph(rand(5))
  text = Faker::Lorem.paragraphs(rand(50)).join("<p>")
  user_id = rand(20) + 1
  fandom_id = rand(10) + 1
  Story.create({title: title, summary: summary, text: text, user_id: user_id,
    fandom_id: fandom_id, notes: notes})
end

genres = ["Genre One", "Genre Two"]

10.times do
  name = Faker::App.name
  category = genres[rand(2)]
  Fandom.create({name: name, category: category})
end

types = ["Ratings", "Warnings", "Categories", "Characters", "Relationships", "Additional"]

100.times do
  label = Faker::Lorem.words.join(" ")
  category = types[rand(6)]
  Tag.create({label: label, category: category})
end

1000.times do
  story_id = rand(100) + 1
  tag_id = rand(100) + 1
  Tagging.create({story_id: story_id, tag_id: tag_id})
end
