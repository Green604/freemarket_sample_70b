class FavoritesController < ApplicationController
  def create
    @favorite = current_user.favorites.create(item_id: params[:item_id])
    # @favorite = Favorite.new(item_id: params[:item_id], user_id: current_user.id)

    # redirect_to item_path(@favorite.item.id)
    if @favorite.save
      respond_to do |format| # リクエストされたformatによって処理を分ける
        # format.html { redirect_to item_path(@favorite.item.id) }
        format.json { render json: @favorite}  # jsファイルで作成したfavorite(@favorite)を使用するため、renderメソッドを使用して、作成したfavoriteをjson形式で返す
        # format.json { render json :@favorite } 7行目の記述が間違っていたので修正した
      end 
    else
      redirect_to item_path(@favorite.item.id)
    end
  end

  def destroy
    @favorite = Favorite.find_by(item_id: params[:item_id], user_id: current_user.id)
    @favorite.destroy
    # redirect_back(fallback_location: item_path(@favorite.item.id))
    respond_to do |format|
      format.json
    end
    
  end

end
