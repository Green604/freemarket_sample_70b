class CreateSellingStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :selling_statuses do |t|
      t.string     :status, null: false
      t.references :item,   foreign_key: true
      t.references :seller, foreign_key: true
      t.timestamps
    end
  end
end
