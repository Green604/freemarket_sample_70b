# FactoryBot.define do

#   factory :item, class: Item do
#     name                  {"Yシャツ"}
#     description           {"新品のYシャツです。"}
#     price                 {10000000}
#     condition             {:"新品・未使用"}
#     category_id           {}
#     shipping_id           {}
#     brand_id              {}
# 画像の追加の記述
#     after(:build) do |item|                           
#       item.images << build(:image, item: item) 
#     end  
#   end



# end

FactoryBot.define do
  factory :item do
    name                  {"Tシャツ"}
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
    # 画像追加の記述
    after(:build) do |item|                           
      item.images << build(:image, item: item) 
    end 
  end

  # 画像なし用のクラス
  factory :item_no_image, class: Item do
    name                  {"Yシャツ"}
    description           {"新品のYシャツです。"}
    price                 {10000000}
    condition             {:"新品・未使用"}
    category_id           {}
    shipping_id           {}
    brand_id              {}
  end

end