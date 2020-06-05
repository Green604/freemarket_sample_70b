class Image < ApplicationRecord
  
  belongs_to :item, optional: true
  mount_uploader :image, ImageUploader

  validates :image, presence: true
  # これがあると画像が投稿できない？
  # validates :item_id, presence: true
end
