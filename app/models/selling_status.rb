class SellingStatus < ApplicationRecord
  belongs_to :item
  belongs_to :seller

  validates :status,    presence: true
  validates :item_id,   presence: true
  validates :seller_id, presence: true
end
