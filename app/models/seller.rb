class Seller < ApplicationRecord
  belongs_to :user
  belongs_to :item
  has_many :chats, dependent: :destroy
  has_many :buyers, through: :chats
  has_one :selling_status, dependent: :destroy

  # 出品機の実装中、sellimng_statusへの登録時エラー出るので一旦コメントアウト
  # validates :user_id presence:true
  # validates :item_id presence:true
end
