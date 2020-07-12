class UserFavoritesController < ApplicationController

  def index
    @items = []
    favorites = current_user.favorites.ids
    favorites.each do |s|
      key_id = Favorite.find(s).item_id
      @item = Item.find(key_id)
      @items << @item
    end
  end

end
