Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :stories, except: [:new, :edit]
    get 'home', to: 'stories#home', defaults: { format: :json }
    resources :fandoms, except: [:new, :edit, :destroy]
  end

  resources :users, only: [:create, :new, :destroy]
  resources :users, only: [:show, :index], defaults: { format: :json }
  get 'sessions/guest', to: "sessions#guest"
  get 'sessions/api/fandoms', to: "api/fandoms#index", defaults: { format: :json }
  get 'users/api/fandoms', to: 'api/fandoms#index', defaults: { format: :json }
  resource :sessions, only: [:create, :new, :destroy]

end
