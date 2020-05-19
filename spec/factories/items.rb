FactoryBot.define do

  factory :item do
    name                  {"abe"}
    description           {"Yシャツ"}
    price                 {"10000000"}
    condition             {:brand_new}
    category_id           {category.id}
    shipping_id           {shipping.id}
    brand_id              {""}
  end

end