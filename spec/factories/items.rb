FactoryBot.define do

  factory :item, class: Item do
    name                  {"abe"}
    description           {"Yシャツ"}
    price                 {10000000}
    condition             {:brand_new}
    category_id           {}
    shipping_id           {}
    brand_id              {}

    after(:build) do |item|                           
      item.images << build(:image, item: item) 
    end  
  end

  factory :item_no_image, class: Item do
    name                  {"abe"}
    description           {"Yシャツ"}
    price                 {10000000}
    condition             {:brand_new}
    category_id           {}
    shipping_id           {}
    brand_id              {}
  end

end