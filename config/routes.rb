Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories
  end

  resources :users, only: [:index, :show, :create, :new, :destroy]
  resource :sessions, only: [:create, :new, :destroy]

end
