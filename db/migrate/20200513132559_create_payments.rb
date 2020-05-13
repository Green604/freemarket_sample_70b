class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.references :user, foreign_key: true
      t.string :payjp_id, null: false
      t.timestamps
    end
  end
end
