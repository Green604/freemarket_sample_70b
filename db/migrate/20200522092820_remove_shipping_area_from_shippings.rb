class RemoveShippingAreaFromShippings < ActiveRecord::Migration[5.2]
  def up
    remove_column :shippings, :shipping_area, :string
  end

  def down
    add_column :shippings, :shipping_area, :string
  end
end
