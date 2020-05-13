class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string  :name,         null: false, index: true
      t.text    :description,  null: false  
      t.integer :price,        null: false   
      t.integer :condition,    null: false 
      t.references :brand,    foreign_key: true
      t.references :category, foreign_key: true
      t.references :shipping, foreign_key: true
      t.timestamps
    end
  end
end
