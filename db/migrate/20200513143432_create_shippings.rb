class CreateShippings < ActiveRecord::Migration[5.2]
  def change
    create_table :shippings do |t|
      t.string  :shipping_area, null: false
      t.string  :shipping_day,  null: false
      t.integer :shipping_fee,  null: false
      t.timestamps
    end
  end
end
