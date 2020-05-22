class PaymentsController < ApplicationController
  require "payjp"

  def index
    @card = Payment.where(user_id: current_user).first
    if @card.present?
      Payjp.api_key = Rails.application.credentials.payjp[:secret_key]
      customer = Payjp::Customer.retrieve(@card.payjp_id)
      @card_info = customer.cards.retrieve(customer.default_card)
      @card_brand = @card_info.brand
      @card_month = @card_info.exp_month
      @card_year = @card_info.exp_year % 1000

      case @card_brand
      when "Visa" then
        @card_image = "cc-visa fa-2x"
      when "MasterCard" then
        @card_image = "cc-mastercard fa-2x"
      when "JCB" then
        @card_image = "c-jcb fa-2x"
      when "American Express" then
        @card_image = "cc-amex fa-2x"
      end

    end
  end

  def new
    # @card = Payment.where(user_id: current_user.id)
    # redirect_to action: "index" if @card.present?
  end

  def create
    Payjp.api_key = Rails.application.credentials.payjp[:secret_key]

    if params['payjpToken'].blank?
      render "new"
    else
      customer = Payjp::Customer.create(
        card: params['payjpToken']
      )
      @card = Payment.new(user_id: current_user.id, payjp_id: customer.id)
      if @card.save
        redirect_to action: "index"
      else
        redirect_to action: "new"
      end
    end

  end

  def destroy
    Payjp.api_key = Rails.application.credentials.payjp[:secret_key]
    @card = Payment.where(user_id: current_user).first
    customer = Payjp::Customer.retrieve(@card.payjp_id)
    customer.delete
      if @card.destroy
        redirect_to action: "index"
      else
        redirect_to action: "index", alert: "削除できませんでした"
      end
  end
  
end
