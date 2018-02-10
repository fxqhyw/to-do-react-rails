Rails.application.routes.draw do

  get 'tokens/create'

  namespace :api do
    namespace :v1 do
      resources :tokens, only: [:create]
      resources :users do
        resources :projects
        resources :tasks
      end
    end
  end
end
