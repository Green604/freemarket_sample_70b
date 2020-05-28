# FactoryBot.define do

#   factory :item, class: Item do
#     name                  {"abe"}
#     description           {"Yシャツ"}
#     price                 {10000000}
#     condition             {:brand_new}
#     category_id           {}
#     shipping_id           {}
#     brand_id              {}

#     after(:build) do |item|                           
#       item.images << build(:image, item: item) 
#     end  
#   end

#   factory :item_no_image, class: Item do
#     name                  {"abe"}
#     description           {"Yシャツ"}
#     price                 {10000000}
#     condition             {:brand_new}
#     category_id           {}
#     shipping_id           {}
#     brand_id              {}
#   end

# end

FactoryBot.define do

  factory :item do
    name                  {""}
    description           {"これはナイキのTシャツです。"}
    price                 {"3000"}
    brand_id              {"1"}
    category_id           {"1"}
    shipping_id           {"1"}
    condition             {:"新品・未使用"}

    # Item.conditions.values.each do |condition|
    #   trait :"#{condition}" do
    #     condition { condition }
    #   end
    # end

    after(:build) do |item|                           
      item.images << build(:image, item: item) 
    end 
  end

end