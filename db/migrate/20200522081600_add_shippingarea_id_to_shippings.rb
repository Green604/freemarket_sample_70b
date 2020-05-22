class AddShippingareaIdToShippings < ActiveRecord::Migration[5.2]
  def change
    add_column :shippings, :shippingarea_id, :integer
  end
end
