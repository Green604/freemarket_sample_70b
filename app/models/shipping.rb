class Shipping < ApplicationRecord
  has_many :items

  validates :shipping_day,  presence: true
  validates :shipping_fee,  presence: true
  validates :shippingway_id,  presence: true
  validates :shippingarea_id,  presence: true
  
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :shippingway
  belongs_to_active_hash :shippingarea
end
