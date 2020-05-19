require 'rails_helper'
describe Item do
  describe '#create' do
    it "商品名がない場合は登録できないこと" do
     item = build(:item, name: "")
     item.valid?
     expect(item.errors[:name]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の説明がない場合は登録できないこと" do
     item = build(:item, description: "")
     item.valid?
     expect(item.errors[:description]).to include("を入力してください")
    end
  end
end

describe Item do
  describe '#create' do
    it "商品のカテゴリーがない場合は登録できないこと" do
     item = build(:item, category_id: "")
     item.valid?
     expect(item.errors[:category_id]).to include()
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の状態がない場合は登録できないこと" do
     item = build(:item, condition: "")
     item.valid?
     expect(item.errors[:condition]).to include()
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の配送情報がない場合は登録できないこと" do
     item = build(:item, shipping_id: "")
     item.valid?
     expect(item.errors[:shipping_id]).to include()
    end
  end
end

describe Item do
  describe '#create' do
    it "商品の販売価格がない場合は登録できないこと" do
     item = build(:item, price: "")
     item.valid?
     expect(item.errors[:price]).to include()
    end
  end
end

describe Item do
  describe '#create' do
    it "商品のブランドがなくても登録できること" do
      # categoryとshippingは参照元が必要
      category = create(:category) 
      shipping = create(:shipping)
      item = build(:item, category_id: category.id, shipping_id: shipping.id, brand_id: "")
      expect(item).to be_valid
    end
  end
end

# @details={:category=>[{:error=>:blank}, {:error=>:blank}], :shipping=>[{:error=>:blank}, {:error=>:blank}], :condition=>[{:error=>:blank}], :images=>[{:error=>:blank}]},
# @messages={:category=>["を入力してください"], :shipping=>["を入力してください"], :condition=>["を入力してください"], :images=>["を入力してください"]}>