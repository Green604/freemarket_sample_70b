FactoryBot.define do
  factory :image do

    image    {File.open("#{Rails.root}/public/images/test_image.png")}
    image    {File.open("#{Rails.root}/public/images/test_image2.png")}
    image    {File.open("#{Rails.root}/public/images/test_image3.png")}
    image    {File.open("#{Rails.root}/public/images/test_image4.png")}

  end
end