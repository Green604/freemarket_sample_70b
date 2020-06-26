Rails.application.routes.draw do

  # patch '/brand/:id/index', to: 'brand#index'

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  devise_scope :user do
    get 'shipping_addresses', to: 'users/registrations#new_shipping_address'
    post 'shipping_addresses', to: 'users/registrations#create_shipping_address'
  end

  root "items#index"

  resources :items do

    resources :favorites, only: [:create, :destroy, :index]

    collection do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
    end

    # 編集画面でカテゴリーを編集可能にするための記述
    member do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
    end

    collection do
      get 'search'
      get 'detail_search'
      get 'detail_search_result'
    end

    resources :comments, only: :create

    resources :purchase, only: [:index] do
      member do
        get 'index', to: 'purchase#index'
        post 'pay', to: 'purchase#pay'
        get 'done', to: 'purchase#done'
      end
    end

  end

  resources :card, only: [:new, :show] do
    collection do
      post 'show', to: 'card#show'
      post 'pay', to: 'card#pay'
      post 'delete', to: 'card#delete'
    end
  end

  get '/brand/:id/index', to: 'brand#index', as: 'brand'

  resources :users, only: :show do

    collection do
      get 'logouts', to: 'logouts#index'
      get 'cards', to: 'cards#index'
    end
  end

  resources :category, only: :new do
    member do
      get 'parents', to: 'category#parents'
      get 'children', to: 'category#children'
      get 'grand_children', to: 'category#grand_children'
    end
  end
end
