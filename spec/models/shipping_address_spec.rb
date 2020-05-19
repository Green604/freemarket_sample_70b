require 'rails_helper'

RSpec.describe ShippingAddress, type: :model do
  describe '#create' do
    context 'shipping_addressを保存できる場合' do
      it "first_name,last_name,first_name_kana,last_name_kana,zipcode,prefecture,city,house_number,phone_numberが存在すれば登録できること" do
        shipping_address = build(:shipping_address)
        expect(shipping_address).to be_valid
      end
    end

    context 'shipping_addressを保存できない場合' do
      it "first_nameがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, first_name: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:first_name]).to include("can't be blank")
      end

      it "last_nameがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, last_name: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:last_name]).to include("can't be blank")
      end

      it "first_name_kanaがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, first_name_kana: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:first_name_kana]).to include("can't be blank")
      end

      it "last_name_kanaがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, last_name_kana: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:last_name_kana]).to include("can't be blank")
      end

      it "zipcodeがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, zipcode: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:zipcode]).to include("can't be blank")
      end

      it "prefectureがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, prefecture: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:prefecture]).to include("can't be blank")
      end

      it "cityがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, city: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:city]).to include("can't be blank")
      end

      it "house_numberがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, house_number: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:house_number]).to include("can't be blank")
      end

      it "phone_numberがない場合は登録できないこと" do
        shipping_address = build(:shipping_address, phone_number: nil)
        shipping_address.valid?
        expect(shipping_address.errors[:phone_number]).to include("can't be blank")
      end

      it " 重複したphone_numberが存在する場合は登録できないこと " do
        shipping_address = create(:shipping_address)
        another_shipping_address = build(:shipping_address, phone_number: shipping_address.phone_number)
        another_shipping_address.valid?
        expect(another_shipping_address.errors[:phone_number]).to include("has already been taken")
      end
    end
  end
end