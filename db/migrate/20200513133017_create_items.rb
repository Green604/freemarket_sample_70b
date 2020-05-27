class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items, id:  :integer do |t|
      t.string  :name,               null: false, index: true
      t.text    :description,        null: false  
      t.integer :price,              null: false   
      t.integer :condition,          null: false
      t.integer :parent_category_id, foreign_key: true
      t.integer :brand_id,           foreign_key: true
      t.integer :category_id,        foreign_key: true
      t.integer :shipping_id,        foreign_key: true
      t.timestamps
    end
  end
end