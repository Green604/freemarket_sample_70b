class Payment < ApplicationRecord
  belongs_to :user

  validates :payjp_id, presence: true
  validates :user_id, presence: true
end
