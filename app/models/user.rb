class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :shipping_address, dependent: :destroy
  has_one :payment, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many  :items,  through:  :favorites
  has_many :sellers, dependent: :destroy
  has_many :buyers, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many  :items,  through:  :comments

  validates :nickname,        presence: true
  validates :first_name,      presence: true
  validates :last_name,       presence: true
  validates :first_name_kana, presence: true
  validates :last_name_kana,  presence: true
  validates :birthday,        presence: true

end
