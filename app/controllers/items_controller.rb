class ItemsController < ApplicationController

  before_action :move_to_index, except: [:index, :show]


  def index
    @items = Item.all
    @parents = Category.all.order("id ASC").limit(13)
  end

  def show
    @item = Item.find(params[:id])
    category_parent = @item.parent_category_id
    @category = Category.find(category_parent)
    category_child = @item.child_category_id
    @category_child = Category.find(category_child)
  end

  def new
    @item = Item.new
    @item.images.new
  end
  
  def edit
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

  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_category_children
    @category_children = Category.find(params[:parent_id]).children
  end

  def get_category_grandchildren
    @category_grandchildren = Category.find(params[:child_id]).children
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :price, :condition, :brand_id, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id])
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end
end
