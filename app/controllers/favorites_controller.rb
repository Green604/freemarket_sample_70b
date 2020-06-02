class FavoritesController < ApplicationController
  def create
    @favorite = current_user.favorites.create(item_id: params[:item_id])
    # redirect_to item_path(@favorite.item.id)
    respond_to do |format|
      # format.html { redirect_to item_path(@favorite.item.id) }
      format.json { render json :@favorite }
    end  
  end

  def destroy
    @favorite = Favorite.find_by(item_id: params[:item_id], user_id: current_user.id)
    @favorite.destroy
    # redirect_back(fallback_location: item_path(@favorite.item.id))
    redirect_to item_path(@favorite.item.id)
  end
end
