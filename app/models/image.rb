class Image < ApplicationRecord
  belongs_to :item 

  validates :image, presence: true
  validates :item_id, presence: true
end
