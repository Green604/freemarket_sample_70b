class ApplicationController < ActionController::Base
  before_action :basic_auth, if: :production?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_parents
  protect_from_forgery with: :exception

  def set_parents
    @parents2 = Category.where(ancestry: nil)
    @brand1 = Brand.find_by(id: 343306)
    @brand2 = Brand.find_by(id: 6739)
    @brand3 = Brand.find_by(id: 118251)
    @brand4 = Brand.find_by(id: 366)
    @brand5 = Brand.find_by(id: 3258)

  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday])
  end

  private

  def production?
    Rails.env.production?
  end

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == "70b" && password == "2020"
      # username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end

end
