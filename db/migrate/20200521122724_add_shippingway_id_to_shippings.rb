class AddShippingwayIdToShippings < ActiveRecord::Migration[5.2]
  def change
    add_column :shippings, :shipping_id, :integer
  end
end
