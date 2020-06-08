class Shipping < ApplicationRecord
  has_many :items

  validates :shipping_day,  presence: true
  validates :shipping_fee,  presence: true
  validates :shippingway_id,  presence: true
  validates :shippingarea_id,  presence: true

  enum shipping_fee: [ :"送料込み（出品者負担）", :"着払い（購入者負担）"]
  
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :shippingway
  belongs_to_active_hash :shippingarea
end
