class PaymentsController < ApplicationController
  require "payjp"

  def index
  end

  def new
    @card = Payment.where(user_id: current_user.id)
    redirect_to action: "index" if @card.present?
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
  
end
