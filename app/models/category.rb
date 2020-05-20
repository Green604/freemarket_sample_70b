class Category < ApplicationRecord
  has_many :items

  validates :name, presence: true

  # 出品機能モデルのバリデーションテスト用でエラーが出る為一旦コメントアウト
  # has_ancestry
end
