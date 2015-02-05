categories = {}

@fandoms.each do |fandom|
  fandom_traits = [fandom.name, fandom.stories.length, fandom.id]
  if categories.include?(fandom.category)
    categories[fandom.category].push(fandom_traits)
  else
    categories[fandom.category] = [fandom_traits]
  end
end

json.categories categories do |category|
  json.category_name category[0]
  json.fandom category[1] do |fandom|
    json.name fandom[0]
    json.story_count fandom[1]
    json.id fandom[2]
  end
end
