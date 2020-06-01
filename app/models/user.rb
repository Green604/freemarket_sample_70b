class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :shipping_address, dependent: :destroy
  has_one :payment, dependent: :destroy
  has_many :favorites, dependent: :destroy 
  has_many  :items, dependent: :destroy
  has_many  :favorite_items, through: :favorites, source: :item #ユーザーがどの商品にいいねをしたか。いいね一覧のため
  has_many :sellers, dependent: :destroy
  has_many :buyers, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many  :items,  through:  :comments

  validates :nickname,        presence: true
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
  validates :birthday,        presence: true

end
