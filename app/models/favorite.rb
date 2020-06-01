class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :item
  validates_uniqueness_of :item_id, scope: :user_id

  validates :item_id, presence: true
  validates :user_id, presence: true
end
