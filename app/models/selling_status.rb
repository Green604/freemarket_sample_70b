class SellingStatus < ApplicationRecord
  belongs_to :item
  # 出品機能実装時にバリデーションで弾かれるので、一旦optional: true追加
  belongs_to :seller, optional: true

  validates :status,    presence: true
  validates :item_id,   presence: true
  validates :seller_id, presence: true
end
