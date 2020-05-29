require 'rails_helper'

# テスト行う際にはcategory.rbのhas_ancestryはコメントアウトしてください

describe Item do
  describe 'validations#update' do
    before do
      # Factorybotでcategory,shipping,brand,imageテスト用データ作成
      @category = create(:category)
      @shipping = create(:shipping) 
      @brand = create(:brand)
      @image = create(:image)
      # 上で作成したテスト用データを使ってitemデータを作成
      @item = create(:item, category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
    end

    it "説明を変えて再登録が出来る" do
      @item.update(description: "黒色のくつしたです。")
      @item.valid?
      expect(@item).to be_valid
    end

    it "値段を変えて再登録が出来る" do
      @item.update(price: 1)
      @item.valid?
      expect(@item).to be_valid
    end

    it "商品状態を変えて再登録が出来る" do
      @item.update(condition: :"傷や汚れあり")
      @item.valid?
      expect(@item).to be_valid
    end

    it "shippingテーブルのshippingarea_idを変更して再登録が出来る" do
      # shippingテーブルのshippingarea_idを"1"から"2"に変更(update)
      @item.shipping.update(shippingarea_id: 2)
      @item.valid?
      expect(@item).to be_valid
    end

    it "shippingテーブルのshippingway_idを変更して再登録が出来る" do
      # shippingテーブルのshippingway_idを"1"から"2"に変更(update)
      @item.shipping.update(shippingway_id: 2)
      @item.valid?
      expect(@item).to be_valid
    end

    it "shippingテーブルのshipping_dayを変更して再登録が出来る" do
      # shippingテーブルのshipping_dayを"１〜２日後"から"2〜3日"で発送に変更(update)
      @item.shipping.update(shipping_day: "2〜3日で発送")
      @item.valid?
      expect(@item).to be_valid
    end

    it "category_idを変更して再登録が出来る" do
      # 変更用のcategorデータを新規に作成
      @category2 = Category.create(name: "レディース")
      # category_idを直前で作成した@category2に変更してupdate
      @item.update(category_id: @category2.id)
      @item.valid?
      expect(@item).to be_valid
    end 
    
    it "brand_idを変更して再登録が出来る" do
      # 変更用のbrandデータを新規作成
      @brand2 = Brand.create(name: "アディダス")
      # brand_idを直前で作成した@brand2に変更してupdate
      @item.update(brand_id: @brand2.id)
      @item.valid?
      expect(@item).to be_valid
    end 

    it "商品名を変えて再登録が出来る" do
      item = create(:item, name: "くつした") 
      item.valid?
      expect(item).to be_valid
    end

    it "説明を変えて再登録が出来る" do
      item = create(:item, description: "これはシャネルのTシャツです。") 
      item.valid?
      expect(item).to be_valid
    end
    
    it "価格を変えて再登録が出来る" do
      item = create(:item, price: "1000000") 
      item.valid?
      expect(item).to be_valid
    end

    it "category_idを変えて再登録が出来る" do
      # デフォルトは546(メンズ)だったのが576(レディース)に変更できていることが確認できた
      item = create(:item, category_id: "576") 
      item.valid?
      expect(item).to be_valid
    end

    it "shipping_idを変えて再登録が出来る" do
      # デフォルトは427だったのが433レディースに変更できていることが確認できた
      item = create(:item, shipping_id: "433") 
      item.valid?
      expect(item).to be_valid
    end

    it "shipping_dayを変えて再登録が出来る" do
      # デフォルトからshipping_id=433に変更し、さらにそのうちのshipping_dayだけ変更することが確認できた
      item = create(:item, shipping_id: "433") 
      item.shipping.update(shipping_day: "4〜7日で発送")
      item.valid?
      expect(item).to be_valid
    end

    it "shipping_dayを変えて再登録が出来る" do
      # デフォルトからshipping_id=433に変更し、さらにそのうちのshipping_feeだけ変更することが確認できた
      item = create(:item, shipping_id: "433") 
      item.shipping.update(shipping_fee: "着払い（購入者負担）")
      item.valid?
      expect(item).to be_valid
      binding.pry
    end

  end


  describe 'validations#create' do
    before do
      # Factorybotでcategory,shipping,brand,imageテスト用データ作成
      @category = create(:category)
      @shipping = create(:shipping) 
      @brand = create(:brand)
      @image = create(:image)
    end

    it "商品名がない場合は登録できないこと" do
      item = build(:item, name: "", category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
      item.valid?
      expect(item.errors[:name]).to include("を入力してください")
    end

    it "商品の説明がない場合は登録できないこと" do
      item = build(:item, description: "", category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
      item.valid?
      expect(item.errors[:description]).to include("を入力してください")
    end

    it "商品のカテゴリーがない場合は登録できないこと" do
      item = build(:item, category_id: "", shipping_id: @shipping.id, brand_id: @brand.id)
      item.valid?
      expect(item.errors[:category]).to include("を入力してください")
    end

    it "商品の状態がない場合は登録できないこと" do
      item = build(:item, condition: "", category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
      item.valid?
      expect(item.errors[:condition]).to include("を入力してください")
    end

    it "商品の配送情報がない場合は登録できないこと" do
      item = build(:item, category_id: @category.id, shipping_id: "", brand_id: @brand.id)
      item.valid?
      expect(item.errors[:shipping]).to include("を入力してください")
    end

    it "商品の販売価格がない場合は登録できないこと" do
      item = build(:item, price: "", category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
      item.valid?
      expect(item.errors[:price]).to include("を入力してください")
    end

    it "商品のブランドがなくても登録できること" do
      item = build(:item, category_id: @category.id, shipping_id: @shipping.id, brand_id: "")
      expect(item).to be_valid
    end
 
    it "画像がないと登録できないこと" do
      item_no_image = build(:item_no_image, category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
      item_no_image.valid?
      expect(item_no_image.errors[:images]).to include("を入力してください")
    end

    it "商品名がない場合は登録できないこと" do
      item = build(:item, name: "", category_id: @category.id, shipping_id: @shipping.id, brand_id: @brand.id)
      item.valid?
      expect(item.errors[:name]).to include("を入力してください")
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