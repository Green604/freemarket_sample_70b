class Chat < ApplicationRecord
  belongs_to :seller
  belongs_to :buyer

  validates :chat, presence: true
end
