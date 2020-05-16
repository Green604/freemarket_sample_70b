class CreateSellingStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :selling_statuses, id: :integer do |t|
      t.string     :status, null: false
      t.integer :item_id,   foreign_key: true
      t.integer :seller_id, foreign_key: true
      t.timestamps
    end
  end
end
