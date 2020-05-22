class ChangeDatatypeShippingfeeofshippping < ActiveRecord::Migration[5.2]
  def change
    change_column :shippings, :shipping_fee, :string
  end
end
