FactoryBot.define do

  factory :item, class: Item do
    name                  { "Yシャツ" }
    description           { "新品のYシャツです。" }
    price                 { 10000000 }
    condition             { :"新品・未使用" }
    category_id           {}
    shipping_id           {}
    brand_id              {}

    # 画像追加の記述
    after(:build) do |item|                           
      item.images << build(:image, item: item) 
    end  
  end

  # 画像がないバージョンのテスト用itemデータ
  factory :item_no_image, class: Item do
    name                  { "abe" }
    description           { "Yシャツ" }
    price                 { 10000000 }
    condition             { :"新品・未使用" }
    category_id           {}
    shipping_id           {}
    brand_id              {}
  end

end