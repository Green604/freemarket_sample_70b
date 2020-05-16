class CreateShippingAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :shipping_addresses do |t|

      t.timestamps
      t.string :first_name,       null: false
      t.string :last_name,        null: false  
      t.string :first_name_kana,  null: false   
      t.string :last_name_kana,   null: false 
      t.integer :zipcode,         null: false  
      t.string :prefecture,       null: false
      t.string :city,             null: false
      t.string :house_number,     null: false  
      t.string :building
      t.integer :phone_number,    null: false, unique: true
      t.references :user, foreign_key: true
    end
  end
end
