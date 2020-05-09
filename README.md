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
- has_one :shipping_address
- has_one :payment
- has_many :favorites
- has_many  :items,  through:  :favorites
- has_many :sellers
- has_one :item,  through:  :sellers
- has_many :buyers
- has_one :item,  through:  :buyers
- has_many :comments
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
- has_many :chats
- has_many  :buyers,  through:  :chats
- has_one :selling_status


## buyersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id   |integer|null: false, foreign_key: true|
|item_id   |integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item
- has_many :chats
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
|brand_id          |integer|foreign_key: true|
|category_id       |integer|null: false, foreign_key: true|
|item_condition_id |integer|null: false, foreign_key: true|
|shipping_area_id  |integer|null: false, foreign_key: true|
|shipping_day_id   |integer|null: false, foreign_key: true|
|shipping_fee_id   |integer|null: false, foreign_key: true|
|seller_id         |integer|null: false, foreign_key: true|
|buyer_id          |integer|null: false, foreign_key: true|
|selling_status_id |integer|null: false, foreign_key: true|

### Association
- has_one :seller
- has_one :buyer ???
- has_one :selling_status ???
<!-- has_oneがあまりよくわからない -->
- has_many :favorites
- has_many :comments
- has_many :images
- belongs_to :brand
- belongs_to :category
- belongs_to :item_dondition
- belongs_to :shipping_area
- belongs_to :shipping_day
- belongs_to :shipping_fee

## seilling_statusテーブル

|Column|Type|Options|
|------|----|-------|
|selling_status_id |integer|#|
|status     |integer|null: false|
|item_id    |integer|null: false, foreign_key: true|

### Association
- belongs_to :item ???
- has_one :seller ???

## imagesテーブル

|Column|Type|Options|
|------|----|-------|
|image_id |integer|#|
|image    |string |null: false|
|item_id  |integer|null: false, foreign_key: true|

### Association
- belongs_to :item 

## brandsテーブル

|------|----|-------|
|brand_id   |integer|#|
|brand_name |string|null: false|

### Association
- has_many :items

## categoriesテーブル

|------|----|-------|
|category_id   |integer|#|
|catrgory_name |string|null: false|
ancestry

### Association
- has_many :items

## items_conditionテーブル

|------|----|-------|
|item_condition_id   |integer|#|
|item_condition |string|null: false|

### Association
- has_many :items

## shipping_areasテーブル

|------|----|-------|
|shipping_area_id   |integer|#|
|shipping_area |string|null: false|

### Association
- has_many :items

## shipping_daysテーブル

|------|----|-------|
|shipping_day_id   |integer|#|
|shipping_day |string|null: false|

### Association
- has_many :items

## shipping_feesテーブル

|------|----|-------|
|shipping_fee_id   |integer|#|
|shipping_fee |integer|null: false|

### Association
- has_many :items
