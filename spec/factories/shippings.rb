FactoryBot.define do
  factory :shipping do

    shippingarea_id  { 1 }
    shipping_day     { "１〜２日後" }
    shipping_fee     { "送料込み（出品者負担）" }
    shippingway_id   { 1 }

  end
end