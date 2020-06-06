class FavoritesController < ApplicationController

  def index
    @favoriteItems = []
    favorites = current_user.favorites.ids
    favorites.each do |f|
      favoriteItem_id = Favorite.find(f).item_id
      @favoriteItem = Item.find(favoriteItem_id)
      @favoriteItems << @favoriteItem
    end
  end

  def create
    @favorite = current_user.favorites.create(item_id: params[:item_id])
    if @favorite.save
      @favoriteCounts = Favorite.where(item_id: params[:item_id])
      respond_to do |format| 
        format.json  
      end 
    else
      redirect_to item_path(@favorite.item.id)
    end
  end

  def destroy
    @favorite = Favorite.find_by(item_id: params[:item_id], user_id: current_user.id)
    @favorite.destroy
    @favoriteCounts = Favorite.where(item_id: params[:item_id])
    respond_to do |format|
      format.json
    end
  end

end
