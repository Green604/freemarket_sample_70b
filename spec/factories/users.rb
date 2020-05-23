FactoryBot.define do

  factory :user do
    nickname              {"kyo"}
    email                 {"kkk@gmail.com"}
    password              {"00000000"}
    password_confirmation {"00000000"}
    first_name            {"恭平"}
    last_name             {"須永"}
    first_name_kana       {"きょうへい"}
    last_name_kana        {"すなが"}
    birthday              {"19910708"}
  end

end