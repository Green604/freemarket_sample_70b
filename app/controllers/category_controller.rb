class CategoryController < ApplicationController

  def new
    @children = Category.find(params[:parent_id]).children
    respond_to do |format|
      format.html
      format.json
    end
  end

  def parents
    @items = Item.all.where(parent_category_id: params[:id])
    @items = @items.page(params[:page]).per(4)
  end

  def children
    @items = Item.all.where(child_category_id: params[:id])
    @items = @items.page(params[:page]).per(4)
  end

  def grand_children
    @items = Item.all.where(category_id: params[:id])
    @items = @items.page(params[:page]).per(4)
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :price, :condition, :brand_id, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image, :_destroy, :id], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id])
  end

end