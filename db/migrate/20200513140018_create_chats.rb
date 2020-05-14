class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats, id: :integer do |t|
      t.text :chat,         null: false
      t.integer :seller_id, foreign_key: true
      t.integer :buyer_id, foreign_key: true
      t.timestamps
    end
  end
end
