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

User.create(username: "guest", password: "password")

ratings = ["unrated", "general", "teen", "mature", "explicit"]
categories = ["British", "American", "German", "Russian", "French", "Other"]
warnings = ["Creator Chose Not To Use Archive Warnings", "No Archive Warnings Apply",
"Graphic Depictions of Violence"]

ratings.each do |rating|
  Tag.create({label: rating, category: "Ratings"})
end

categories.each do |category|
  Tag.create({label: category, category: "Categories"})
end

warnings.each do |warning|
  Tag.create({label: warning, category: "Warnings"})
end

100.times do
  title = Faker::Lorem.sentence
  summary = Faker::Lorem.paragraph(rand(5))
  notes = Faker::Lorem.paragraph(rand(5))
  text = Faker::Lorem.paragraphs(rand(50)).join("<p>")
  user_id = rand(20) + 1
  fandom_id = rand(10) + 1
  kudos = rand(100)
  hits = rand(300)
  rating = Tag.find_by_label(ratings[rand(5)]).id
  category = Tag.find_by_label(categories[rand(6)]).id
  story = Story.create({title: title, summary: summary, text: text, user_id: user_id,
    fandom_id: fandom_id, notes: notes, kudos_count: kudos, hits: hits})
  Tagging.create({story_id: story.id, tag_id: rating})
  Tagging.create({story_id: story.id, tag_id: category})
end

genres = ["Genre One", "Genre Two"]

10.times do
  name = Faker::App.name
  category = genres[rand(2)]
  Fandom.create({name: name, category: category})
end

5000.times do
  user_id = rand(20) + 1
  story_id = rand(100) + 1
  Kudos.create({user_id: user_id, story_id: story_id})
end

types = ["Characters", "Relationships", "Additional"]

50.times do
  label = Faker::Lorem.words.join(" ")
  category = types[rand(3)]
  Tag.create({label: label, category: category})
end

666.times do
  story_id = rand(100) + 1
  tag_id = rand(56) + 13
  Tagging.create({story_id: story_id, tag_id: tag_id})
end
