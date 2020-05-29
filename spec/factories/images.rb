FactoryBot.define do
  factory :image do

    #each文とかの繰り返し処理をすればうまくいくか？とも思ったが、書き方が分からない
    image    {File.open("#{Rails.root}/public/images/test_image.png")}

    #これだとエラーになる
    # image    {File.open("#{Rails.root}/public/images")}


  end
end