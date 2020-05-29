FactoryBot.define do
  factory :item do
    name                  {"Tシャツ"}
    description           {"これはナイキのTシャツです。"}
    price                 {"3000"}
    brand_id              {}
    category_id           {"546"}
    shipping_id           {"427"}
    condition             {:"新品・未使用"}

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
    category_id           {"1"}
    shipping_id           {"1"}
    brand_id              {"1"}
  end

end