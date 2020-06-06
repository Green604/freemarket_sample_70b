class Shipping < ApplicationRecord
  has_many :items

  validates :shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id, presence: true
  
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :shippingway
  belongs_to_active_hash :shippingarea
end
