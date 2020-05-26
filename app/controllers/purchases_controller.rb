class PurchasesController < ApplicationController
  require "payjp"

  def edit
    # 購入確認画面
    @item = Item.find(params[:id])
  end

  def update
    # 購入処理→完了画面
  end

end
