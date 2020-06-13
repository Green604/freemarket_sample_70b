class PurchaseController < ApplicationController

  require 'payjp'
  before_action :set_item

  def index
    card = Payment.find_by(user_id: current_user.id)
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
      @card_brand = @default_card_information.brand
      @card_month = @default_card_information.exp_month
      @card_year = @default_card_information.exp_year % 1000

      case @card_brand
      when "Visa" then
        @card_image = "cc-visa fa-2x"
      when "MasterCard" then
        @card_image = "cc-mastercard fa-2x"
      when "JCB" then
        @card_image = "c-jcb fa-2x"
      when "American Express" then
        @card_image = "cc-amex fa-2x"
      when "Diners Club" then
        @card_image = "cc-diners-club fa-2x"
      when "Discover" then
        @card_image = "cc-discover fa-2x"
      end

      case @item.shipping.shipping_fee
      when "送料込み（出品者負担）" then
        @shipping_fee = "送料込み"
      when "着払い（購入者負担）" then
        @shipping_fee = "着払い"
      end

    end
  end

  def pay
    card = Payment.find_by(user_id: current_user.id)
    Payjp.api_key = ENV['PAYJP_PRIVATE_KEY']
    Payjp::Charge.create(
    amount: @item.price, #支払金額を入力（itemテーブル等に紐づけても良い）
    customer: card.customer_id, #顧客ID
    currency: 'jpy', #日本円
    )
    buyer = Buyer.new(item_id: @item.id, user_id: current_user.id)
    if buyer.save
      redirect_to action: 'done' #完了画面に移動
    else
      flash.now[:alert] = 'エラーが発生しました。'
      render :index
    end
  end

  def done
    case @item.shipping.shipping_fee
    when "送料込み（出品者負担）" then
      @shipping_fee = "送料込み"
    when "着払い（購入者負担）" then
      @shipping_fee = "着払い"
    end
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :price, :condition, :brand_id, :parent_category_id, :child_category_id, :category_id, :shipping_id, images_attributes: [:image], shipping_attributes: [:shipping_day, :shipping_fee, :shippingway_id, :shippingarea_id])
  end

  def set_item
    @item = Item.find(params[:id])
  end
  
end
