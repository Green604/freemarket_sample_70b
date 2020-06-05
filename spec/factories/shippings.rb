FactoryBot.define do
  factory :shipping do

    shippingarea_id    {1}
    shippingway_id     {1}
    shipping_day       {"1〜2日後"}
    shipping_fee       {"送料込み（出品者負担）"}

  end
end