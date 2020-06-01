require 'rails_helper'

RSpec.describe Payment, type: :model do
  describe '#pay' do
    it "card_idがない場合は登録できないこと" do
      payment = build(:payment, card_id: nil)
      payment.valid?
      expect(payment.errors[:card_id]).to include("を入力してください")
    end

    it "customer_idがない場合は登録できないこと" do
      payment = build(:payment, customer_id: nil)
      payment.valid?
      expect(payment.errors[:customer_id]).to include("を入力してください")
    end

    it ' user_idが無いと保存できないこと' do
      payment = build(:payment, user_id: nil)
      payment.valid?
      expect(payment.errors[:user_id]).to include("を入力してください")
    end
  end
end