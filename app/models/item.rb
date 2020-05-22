class Item < ApplicationRecord
  has_one :seller, dependent: :destroy
  has_one :buyer
  has_one :selling_status, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :users, through: :favorites
  has_many :comments, dependent: :destroy
  has_many :users, through: :comments
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images
  belongs_to :brand
  belongs_to :category
  belongs_to :shipping

  validates :name, presence: true
  validates :description, presence: true
  validates :price, presence: true
  validates :condition, presence: true
  validates :category, presence: true
  validates :shipping, presence: true
  validates :brand, presence: true

  enum condition: [:"新品", :"未使用", :"美品", :"多少傷あり", :"傷あり", :"悪い"]
end