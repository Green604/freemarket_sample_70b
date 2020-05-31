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
      customer = Payjp::Customer.create(
      description: '登録テスト', #なくてもOK
      email: current_user.email, #なくてもOK
      card: params['payjp-token'],
      metadata: {user_id: current_user.id}
      ) #念の為metadataにuser_idを入れましたがなくてもOK
      @card = Payment.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
      if @card.save
        redirect_to action: "show"
      else
        redirect_to action: "pay"
      end
    end
  end

  def delete #PayjpとCardデータベースを削除します
    card = Payment.where(user_id: current_user.id).first
    if card.blank?
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(card.customer_id)
      customer.delete
      card.delete
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
    end
  end
end

# 岩崎追加
  # def show #Cardのデータpayjpに送り情報を取り出します
  #   card = Payment.where(user_id: current_user.id).first
  #   if card.present?
  #     Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
  #     customer = Payjp::Customer.retrieve(card.customer_id)
  #     @default_card_information = customer.cards.retrieve(card.card_id)
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



