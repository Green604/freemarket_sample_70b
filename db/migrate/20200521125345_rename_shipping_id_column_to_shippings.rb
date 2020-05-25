class RenameShippingIdColumnToShippings < ActiveRecord::Migration[5.2]
  def change
    rename_column :shippings, :shipping_id, :shippingway_id
  end
end
