class ItemsController < ApplicationController

  before_action :move_to_index, except: [:index, :show, :search]
  # ログインユーザー≠出品者のときに、直接URL指定にてedit,update,desytoyへアクセスされた場合も制限するため追記
  before_action :set_item, only: [:show, :edit, :update, :destroy, :ensure_correct_user]
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]}
  before_action :set_ransack


  def index
    @items = Item.all
    @parents = Category.all.order("id ASC").limit(13)
    @chanel = Item.all.where(brand_id: 4407)
    @nike = Item.all.where(brand_id: 6810)
    @louisvuitton = Item.all.where(brand_id: 11180)
  end

  def show
    @category = Category.find(@item.parent_category_id)
    @category_child = Category.find(@item.child_category_id)
    @comment = Comment.new
    @comments = @item.comments.includes(:user).order("created_at DESC")
    @favorite = Favorite.new 
    @images = @item.images
    @image = @images.first
    @previous_item = Item.previous(@item)
    @next_item = Item.next(@item)
  end

  def new
    @item = Item.new
    @item.images.new
  end
  
  def create
    @item = Item.new(item_params)
    # 出品ページからparamsで受け取った入力ワードが既にbrandテーブルにあるか検索
    @brand = Brand.find_by(name: "#{params[:input]}")  
    begin
      ActiveRecord::Base.transaction do   
        if @item.save!
          # ① 既にbrand名が存在すれば@itemデータのbrand_id部分を更新して保存
          if @brand
            @item.update!(brand_id: @brand.id)
          else
            # ②-1 ない場合でかつ入力フォームが空じゃない限りは
            unless "#{params[:input]}".blank?
              # ②-2 まずbrandテーブルに新規で保存
              brand = Brand.new(name: "#{params[:input]}")
              if brand.save!
                # ③-3 上で保存したばかりのbrand_idを@itemで入れて更新、保存
                @item.update!(brand_id: brand.id)
              end
            end
          end
          selling_status = SellingStatus.new(item_id: @item.id, seller_id: params[:user_id], status: "出品中")
          seller = Seller.new(item_id: @item.id, user_id: params[:user_id])
          selling_status.save!
          seller.save!
        end
      end
      redirect_to item_path (@item.id)
    rescue
      flash.now[:alert] = 'エラーが発生しました。'
      render :new
    end
  end
  
  def edit
  end

  def update
    @brand = Brand.find_by(name: "#{params[:input]}")
    begin
      ActiveRecord::Base.transaction do
        @item.update!(item_params)
        if @brand
          @item.update!(brand_id: @brand.id)
        else
          if "#{params[:input]}".blank?
            @item.update!(brand_id: nil)
          else
            brand = Brand.new(name: "#{params[:input]}")
            if brand.save!
              @item.update!(brand_id: brand.id)
            end
          end
        end
      end
      redirect_to root_path
    rescue
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
    params.require(:item).permit(:name, :description, :price, :condition, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image, :_destroy, :id], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id], brands_attributes: [:name, :_destroy, :id])
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
