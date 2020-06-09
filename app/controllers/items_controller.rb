class ItemsController < ApplicationController

  before_action :move_to_index, except: [:index, :show, :search]
  # ログインユーザー≠出品者のときに、直接URL指定にてedit,update,desytoyへアクセスされた場合も制限するため追記
  before_action :set_item, only: [:show, :edit, :update, :destroy, :ensure_correct_user]
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]}
  before_action :set_ransack


  def index
    @items = Item.all
    @parents = Category.all.order("id ASC").limit(13)
  end

  def new
    @item = Item.new
    @item.images.new
  end
  
  def create
    @item = Item.new(item_params)
    if @item.save
      selling_status = SellingStatus.new(item_id: @item.id, seller_id: params[:user_id], status: "出品中")
      seller = Seller.new(item_id: @item.id, user_id: params[:user_id])
      if selling_status.save && seller.save
        redirect_to item_path (@item.id)
      else
        flash.now[:alert] = 'エラーが発生しました。'
        render :new
      end
    else
      flash.now[:alert] = '入力されていない項目があります。'
      render :new
    end
    
  end

  def show
    @category = Category.find(@item.parent_category_id)
    @category_child = Category.find(@item.child_category_id)
    @comment = Comment.new
    @comments = @item.comments.includes(:user).order("created_at DESC")
  end
  
  def edit

  end

  def update

    if @item.update(item_params)
      redirect_to root_path
    else
      flash.now[:alert] = 'エラーが発生しました。'
      render :edit
    end
  end

  def search
    @items = Item.d_search(params[:keyword])
  end

  def detail_search
    @search_item = Item.ransack(params[:q])
    @items = @search_item.result.page(params[:page])
    @grandchild_category = Category.where('ancestry LIKE(?)',"%/%")
    @child_category = Category.where.not('ancestry LIKE(?)',"%/%").where.not(ancestry: nil)
  end

  def detail_search_result
    @search_item = Item.ransack(params[:q])
    @items = @search_item.result.page(params[:page])
  end

  def destroy
    @item.destroy
    redirect_to root_path
  end

  def get_category_children
    @category_children = Category.find(params[:parent_id]).children
  end

  def get_category_grandchildren
    @category_grandchildren = Category.find(params[:child_id]).children
  end

  def ensure_correct_user
    if @current_user.id != @item.seller.user.id
      flash[:notice] = "権限がありません"
      redirect_to item_path (@item.id)
    end
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :price, :condition, :brand_id, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image, :_destroy, :id], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id], brands_attributes: [:name, :_destroy, :id])
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end

  def set_item
    @item = Item.find(params[:id])
  end

  def set_ransack
    @q = Item.ransack(params[:q])
  end

end
