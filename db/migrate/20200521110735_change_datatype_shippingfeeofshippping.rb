class ChangeDatatypeShippingfeeofshippping < ActiveRecord::Migration[5.2]
  def up
    change_column :shippings, :shipping_fee, :string
  end

  def down
    
  end
end
