class PurchaseController < ApplicationController

  require 'payjp'
  before_action :set_item

  def index
    card = Payment.where(user_id: current_user.id).first
    #Cardテーブルは前回記事で作成、テーブルからpayjpの顧客IDを検索
    if card.blank?
      #登録された情報がない場合にカード登録画面に移動
      redirect_to controller: "card", action: "new"
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      #保管した顧客IDでpayjpから情報取得
      customer = Payjp::Customer.retrieve(card.customer_id)
      #保管したカードIDでpayjpから情報取得、カード情報表示のためインスタンス変数に代入
      @default_card_information = customer.cards.retrieve(card.card_id)
    end
  end

  def pay
    card = Payment.where(user_id: current_user.id).first
    Payjp.api_key = ENV['PAYJP_PRIVATE_KEY']
    Payjp::Charge.create(
    :amount => @item.price, #支払金額を入力（itemテーブル等に紐づけても良い）
    :customer => card.customer_id, #顧客ID
    :currency => 'jpy', #日本円
    )
    buyer = Buyer.new(item_id: @item.id, user_id: current_user.id)
    if buyer.save
      redirect_to action: 'done' #完了画面に移動
    else
      flash.now[:alert] = 'エラーが発生しました。'
      render :index
    end
  end

  def set_item
    @item = Item.find(params[:id])
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :price, :condition, :brand_id, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id])
  end
  
end

# 岩崎追記
# def index
    # 配送先情報取得
#   @user_adress = ShippingAddress.find_by(user_id: current_user.id)
#   @card = Payment.where(user_id: current_user).first
    # カード登録知てない場合の表示の切り替えはビューの方で記載してます
#   if @card.present?
#     Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
#     customer = Payjp::Customer.retrieve(card.customer_id)
#     @default_card_information = customer.cards.retrieve(customer.default_card)
#     @card_brand = @default_card_information.brand
#     @card_month = @default_card_information.exp_month
#     @card_year = @default_card_information.exp_year % 1000
      
      # カード会社画像表示ための分岐
#     case @card_brand
#     when "Visa" then
#       @card_image = "cc-visa fa-2x"
#     when "MasterCard" then
#       @card_image = "cc-mastercard fa-2x"
#     when "JCB" then
#       @card_image = "c-jcb fa-2x"
#     when "American Express" then
#       @card_image = "cc-amex fa-2x"
#     end

#   end
# end

