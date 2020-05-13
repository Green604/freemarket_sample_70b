class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.text :chat,         null: false
      t.references :seller, foreign_key: true
      t.references :buyer, foreign_key: true
      t.timestamps
    end
  end
end
