require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#create' do
    context 'userを保存できる場合' do
      it "nicknameとemail、passwordとpassword_confirmation,first_name,last_name,first_name_kana,last_name_kana,birthdayが存在すれば登録できること" do
        user = build(:user)
        expect(user).to be_valid
      end

      it " passwordが7文字以上であれば登録できること " do
        user = build(:user, password: "0000000", password_confirmation: "0000000")
        user.valid?
        expect(user).to be_valid
      end
    end


    context 'userを保存できない場合' do
      it " nicknameがない場合は登録できないこと" do
        user = build(:user, nickname: nil)
        user.valid?
        expect(user.errors[:nickname]).to include("can't be blank")
      end

      it "emailがない場合は登録できないこと" do
        user = build(:user, email: nil)
        user.valid?
        expect(user.errors[:email]).to include("can't be blank")
      end

      it "passwordがない場合は登録できないこと" do
        user = build(:user, password: nil)
        user.valid?
        expect(user.errors[:password]).to include("can't be blank")
      end

      it "passwordが存在してもpassword_confirmationがない場合は登録できないこと" do
        user = build(:user, password_confirmation: "")
        user.valid?
        expect(user.errors[:password_confirmation]).to include("doesn't match Password")
      end

      it "first_nameがない場合は登録できないこと" do
        user = build(:user, first_name: nil)
        user.valid?
        expect(user.errors[:first_name]).to include("can't be blank")
      end

      it "last_nameがない場合は登録できないこと" do
        user = build(:user, last_name: nil)
        user.valid?
        expect(user.errors[:last_name]).to include("can't be blank")
      end

      it "first_name_kanaがない場合は登録できないこと" do
        user = build(:user, first_name_kana: nil)
        user.valid?
        expect(user.errors[:first_name_kana]).to include("can't be blank")
      end

      it "last_name_kanaがない場合は登録できないこと" do
        user = build(:user, last_name_kana: nil)
        user.valid?
        expect(user.errors[:last_name_kana]).to include("can't be blank")
      end

      it "birthdayがない場合は登録できないこと" do
        user = build(:user, birthday: nil)
        user.valid?
        expect(user.errors[:birthday]).to include("can't be blank")
      end
  
      it " 重複したemailが存在する場合は登録できないこと " do
        user = create(:user)
        another_user = build(:user, email: user.email)
        another_user.valid?
        expect(another_user.errors[:email]).to include("has already been taken")
      end

      it " passwordが6文字以下であれば登録できないこと " do
        user = build(:user, password: "000000", password_confirmation: "000000")
        user.valid?
        expect(user.errors[:password]).to include("is too short (minimum is 7 characters)")
      end

      it 'first_nameが全角で返ること' do
        user = build(:user, first_name: "kana")
        user.valid?
        expect(user.errors[:first_name]).to include("全角で入力して下さい")
      end

      it 'last_nameが全角で返ること' do
        user = build(:user, last_name: "kana")
        user.valid?
        expect(user.errors[:last_name]).to include("全角で入力して下さい")
      end

      it 'last_name_kanaが全角ひらがなで返ること' do
        user = build(:user, last_name_kana: "kana")
        user.valid?
        expect(user.errors[:last_name_kana]).to include("全角ひらがなで入力して下さい")
      end

      it 'first_name_kanaが全角ひらがなで返ること' do
        user = build(:user, first_name_kana: "kana")
        user.valid?
        expect(user.errors[:first_name_kana]).to include("全角ひらがなで入力して下さい")
      end
    end
  end
end
