class CardController < ApplicationController

  require "payjp"

  def new
    card = Payment.where(user_id: current_user.id)
    redirect_to action: "show" if card.exists?
  end

  def pay #payjpとCardのデータベース作成を実施します。
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    if params['payjp-token'].blank?
      redirect_to action: "new"
    else
      customer = Payjp::Customer.create( #同時に顧客IDもpayjpサーバーで生成される
      card: params['payjp-token'], #jsで受け取ったpayjp_tokenの情報をpeyjpのサーバーで保存
      )
      @card = Payment.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
      #@cardインスタンス変数にpaymentsテーブルの各カラムに入れたい情報を代入
      if @card.save
        redirect_to action: "show"
      else
        redirect_to action: "new"
      end
    end
  end

  def delete #PayjpとCardデータベースを削除します
    card = Payment.where(user_id: current_user.id).first
    if card.blank?
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(card.customer_id) #payjpサーバー上からカードの顧客IDで顧客を検索
      customer.delete #payjpサーバーのデータ削除
      card.delete #DBのデータ削除
    end
      redirect_to action: "new"
  end

  def show #Cardのデータpayjpに送り情報を取り出します
    card = Payment.where(user_id: current_user.id).first
    if card.blank?
      redirect_to action: "new" 
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(card.customer_id)
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
        @card_image = "cc-jcb fa-2x"
      when "American Express" then
        @card_image = "cc-amex fa-2x"
      when "Diners Club" then
        @card_image = "cc-diners-club fa-2x"
      when "Discover" then
        @card_image = "cc-discover fa-2x"
      end
    end
  end
end
