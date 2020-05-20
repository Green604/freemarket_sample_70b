class ShippingAddress < ApplicationRecord
  belongs_to :user, optional: true

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :first_name_kana, presence: true
  validates :last_name_kana, presence: true
  validates :zipcode, presence: true
  validates :prefecture, presence: true
  validates :city, presence: true
  validates :house_number, presence: true
  validates :phone_number, presence: true, uniqueness: true

  validates :first_name,      presence: true,
                              format: {
                                with: /\A[ぁ-んァ-ン一-龥]/,
                                message: "全角で入力して下さい"
                              }
  validates :last_name,       presence: true,
                              format: {
                                with: /\A[ぁ-んァ-ン一-龥]/,
                                message: "全角で入力して下さい"
                              }
  validates :first_name_kana, presence: true,
                              format: {
                                with: /\A[ぁ-ん]/,
                                message: "全角ひらがなで入力して下さい"
                              }
  validates :last_name_kana,  presence: true,
                              format: {
                                with: /\A[ぁ-ん]/,
                                message: "全角ひらがなで入力して下さい"
                              }

end
