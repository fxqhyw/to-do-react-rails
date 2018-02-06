Rails.application.routes.draw do

  get 'tokens/create'

  namespace :api do
    namespace :v1 do
      resources :users
      resources :tokens, only: [:create]
      resources :projects
      resources :tasks
    end
  end
end
