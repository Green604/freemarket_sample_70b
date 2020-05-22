class Item < ApplicationRecord
  has_one :seller, dependent: :destroy
  has_one :buyer
  has_one :selling_status, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :users, through: :favorites
  has_many :comments, dependent: :destroy
  has_many :users, through: :comments
  has_many :images, dependent: :destroy
  belongs_to :brand, optional: true
  belongs_to :category
  belongs_to :shipping

  validates :name, presence: true
  validates :description, presence: true
  validates :price, presence: true
  validates :condition, presence: true
  validates :category, presence: true
  validates :shipping, presence: true

  validates_associated :images
  validates :images, presence: true


  enum condition: [ :brand_new, :no_use, :clean, :litte_dirty, :dirty, :bad ]
  
  # mount_uploader :image, ImageUploader
  accepts_nested_attributes_for :images, allow_destroy: true
  accepts_nested_attributes_for :shipping
