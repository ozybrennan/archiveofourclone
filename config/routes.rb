Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, except: [:new, :edit]
    resources :fandoms, except: [:new, :edit, :destroy]
  end

  resources :users, only: [:create, :new, :destroy]
  resources :users, only: [:show, :index], defaults: { format: :json }
  resource :sessions, only: [:create, :new, :destroy]

end
