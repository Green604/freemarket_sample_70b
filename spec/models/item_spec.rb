require 'rails_helper'

# テスト行う際にはcategory.rbのhas_ancestryはコメントアウトしてください

describe Item do
  describe '#create' do
    it "商品名がない場合は登録できないこと" do
      category = create(:category)
      shipping = create(:shipping)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, name: "", category_id: category.id, shipping_id: shipping.id, brand_id: brand.id)
      item.valid?
      expect(item.errors[:name]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の説明がない場合は登録できないこと" do
      category = create(:category)
      shipping = create(:shipping)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, description: "", category_id: category.id, shipping_id: shipping.id, brand_id: brand.id)
      item.valid?
      expect(item.errors[:description]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品のカテゴリーがない場合は登録できないこと" do
      shipping = create(:shipping)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, category_id: "", shipping_id: shipping.id, brand_id: brand.id)
      item.valid?
      expect(item.errors[:category]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の状態がない場合は登録できないこと" do
      category = create(:category)
      shipping = create(:shipping)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, condition: "")
      item.valid?
      expect(item.errors[:condition]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の配送情報がない場合は登録できないこと" do
      category = create(:category)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, category_id: category.id, shipping_id: "", brand_id: brand.id)
      item.valid?
      expect(item.errors[:shipping]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の販売価格がない場合は登録できないこと" do
      category = create(:category)
      shipping = create(:shipping)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, price: "", category_id: category.id, shipping_id: shipping.id, brand_id: brand.id)
      item.valid?
      expect(item.errors[:price]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品のブランドがなくても登録できること" do
      category = create(:category)
      shipping = create(:shipping)
      image = create(:image)
      item = build(:item, category_id: category.id, shipping_id: shipping.id, brand_id: "")
      expect(item).to be_valid
    end
  end
end

describe Item do
  describe '#create' do
    it "画像がないと登録できないこと" do
      category = create(:category)
      shipping = create(:shipping)
      brand = create(:brand)
      item_no_image = build(:item_no_image, category_id: category.id, shipping_id: shipping.id, brand_id: brand.id)
      item_no_image.valid?
      expect(item_no_image.errors[:images]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品名がない場合は登録できないこと" do
      category = create(:category)
      shipping = create(:shipping)
      brand = create(:brand)
      image = create(:image)
      item = build(:item, name: "", category_id: category.id, shipping_id: shipping.id, brand_id: brand.id)
      item.valid?
      expect(item.errors[:name]).to include("を入力してください")
    end
  end
end
