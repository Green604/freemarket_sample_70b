json.array! @items, partial: "items/item", as: :item
json.array! @children do |child|
  json.id child.id
  json.name child.name
end