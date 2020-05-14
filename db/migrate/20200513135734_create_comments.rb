class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments, id: :integer do |t|
      t.text       :comment, null: false
      t.integer :item_id,    foreign_key: true
      t.integer :user_id,    foreign_key: true
      t.timestamps
    end
  end
end
