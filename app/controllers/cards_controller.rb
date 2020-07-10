class CardsController < ApplicationController

  def index
    card = Payment.where(user_id: current_user.id).first
    if card.present?
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
