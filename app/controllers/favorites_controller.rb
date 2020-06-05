class FavoritesController < ApplicationController

  def index
    @favoriteItems = []
    favorites = current_user.favorites.ids          #current_userのfavorite_idを取得
    favorites.each do |f|                           #current_userがお気に入りした数だけ１つずつ取り出して行われる
      favoriteItem_id = Favorite.find(f).item_id    #user.id=current_user.idに対応するitem_idをfavoriteテーブルで取り出す
      @favoriteItem = Item.find(favoriteItem_id)    #1つ上で取り出したitem_idに当たるitemをitemテーブルで取り出す
      @favoriteItems << @favoriteItem               #配列に入れる
    end
  end

  def create
    @favorite = current_user.favorites.create(item_id: params[:item_id])
    # @favorite = Favorite.new(item_id: params[:item_id], user_id: current_user.id)

    # redirect_to item_path(@favorite.item.id)
    if @favorite.save
      @favoriteCounts = Favorite.where(item_id: params[:item_id])
      respond_to do |format| # リクエストされたformatによって処理を分ける
        # format.html { redirect_to item_path(@favorite.item.id) }
        format.json  # jsファイルで作成したfavorite(@favorite)を使用するため、renderメソッドを使用して、作成したfavoriteをjson形式で返す
        # format.json { render json :@favorite } 7行目の記述が間違っていたので修正した
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
