# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname  |string|null: false|
|email     |string|null: false, unique: true|
|password  |string|null: false|
|first_name|string|null: false|
|last_name |string|null: false|
|first_name_kana|string|null: false|
|last_name_kana |string|null: false|
|birthday       |date|null: false|

### Association
- has_one :shipping_address, dependent: :destroy
- has_one :payment, dependent: :destroy
- has_many :favorites, dependent: :destroy
- has_many  :items,  through:  :favorites
- has_many :sellers, dependent: :destroy
- has_many :buyers, dependent: :destroy
- has_many :comments, dependent: :destroy
- has_many  :items,  through:  :comments

## shipping_addressesテーブル

|Column|Type|Options|
|------|----|-------|
|first_name      |string|null: false|
|last_name       |string|null: false|
|first_name_kana |string|null: false|
|last_name_kana  |string|null: false|
|zipcode         |integer|null: false|
|prefecture      |string|null: false|
|city            |string|null: false|
|house_number    |string|null: false|
|building        |string||
|phone_number    |integer|null: false, unique: true| 
|user_id         |integer|null: false, foreign_key: true|

### Association
- belongs_to :user

## paymentsテーブル

|Column|Type|Options|
|------|----|-------|
|card_number       |integer|null: false, unique: true|
|expiration_month  |integer|null: false|
|expiration_year   |integer|null: false|
|security_code     |integer|null: false|
|payjp_id          |integer|null: false, unique: true|
|token_id          |integer|null: false, unique: true|
|user_id           |integer|null: false, foreign_key: true|

### Association
- belongs_to :user

## favoritesテーブル

|Column|Type|Options|
|------|----|-------|
|item_id     |integer|null: false, foreign_key: true|
|user_id     |integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item


## sellersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id   |integer|null: false, foreign_key: true|
|item_id   |integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item
- has_many :chats, dependent: :destroy
- has_many  :buyers,  through:  :chats
- has_one :selling_status, dependent: :destroy


## buyersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id   |integer|null: false, foreign_key: true|
|item_id   |integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item
- has_many :chats, dependent: :destroy
- has_many  :sellers,  through:  :chats

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|comment    |text   |null: false|
|item_id    |integer|null: false, foreign_key: true|
|user_id    |integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|chat        |text|null: false|
|seller_id   |integer|null: false, foreign_key: true|
|buyer_id    |integer|null: false, foreign_key: true|

### Association
- belongs_to :seller
- belongs_to :buyer

## itemsテーブル

|Column|Type|Options|
|------|----|-------|
|item_name         |string|null: false, index: true|
|description       |text|null: false|
|price             |integer|null: false|
|condition         |integer|null: false, enum|
|brand_id          |integer|foreign_key: true|
|category_id       |integer|null: false, foreign_key: true|
|shipping_id       |integer|null: false, foreign_key: true|

### Association
- has_one :seller, dependent: :destroy
- has_one :buyer
- has_one :selling_status, dependent: :destroy
- has_many :favorites, dependent: :destroy
- has_many  :users,  through:  :favorites
- has_many :comments, dependent: :destroy
- has_many  :users,  through:  :comments
- has_many :images, dependent: :destroy
- belongs_to :brand
- belongs_to :category
- belongs_to :shipping

## selling_statusテーブル

|Column|Type|Options|
|------|----|-------|
|status     |string|null: false|
|item_id    |integer|null: false, foreign_key: true|
|seller_id  |integer|null: false, foreign_key: true|

### Association
- belongs_to :item
- belongs_to :seller

## imagesテーブル

|Column|Type|Options|
|------|----|-------|
|image    |string |null: false|
|item_id  |integer|null: false, foreign_key: true|

### Association
- belongs_to :item 

## brandsテーブル

|Column|Type|Options|
|------|----|-------|
|name |string|null: false|

### Association
- has_many :items

## categoriesテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :items
- has_ancestry

## shippingsテーブル

|Column|Type|Options|
|------|----|-------|
|shipping_area |string|null: false|
|shipping_day  |string|null: false|
|shipping_fee  |integer|null: false|

### Association
- has_many :items
