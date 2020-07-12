class BrandController < ApplicationController

  def index
    @items = Item.where(brand_id: params[:id])
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :price, :condition, :brand_id, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image, :_destroy, :id], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id])
  end

end