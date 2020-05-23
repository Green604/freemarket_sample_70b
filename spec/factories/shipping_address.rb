FactoryBot.define do

  factory :shipping_address do
    first_name            {"恭平"}
    last_name             {"須永"}
    first_name_kana       {"きょうへい"}
    last_name_kana        {"すなが"}
    zipcode        {"1234567"}
    prefecture        {"群馬県"}
    city        {"大泉町"}
    house_number        {"1000-1"}
    phone_number        {"08012345678"}
  end

end