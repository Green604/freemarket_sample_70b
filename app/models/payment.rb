class Payment < ApplicationRecord
  belongs_to :user
  validates :user_id, :card_id, :customer_id, presence: true
end
