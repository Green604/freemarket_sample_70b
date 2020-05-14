class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites, id: :integer do |t|
      t.integer :item_id, foreign_key: true
      t.integer :user_id, foreign_key: true
      t.timestamps
    end
  end
end
