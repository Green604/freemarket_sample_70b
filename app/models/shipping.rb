class Shipping < ApplicationRecord
  has_many :items
  
  validates :shipping_area, presence: true
  validates :shipping_day,  presence: true
  validates :shipping_fee,  presence: true
  
end
