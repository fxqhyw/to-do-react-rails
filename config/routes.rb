Rails.application.routes.draw do

  get 'tokens/create'

  namespace :api do
    namespace :v1 do
      resources :tokens, only: [:create]
      resources :users, only: [:create, :show] do
        resources :projects
        resources :tasks
        put 'tasks', to: 'tasks#update_priority'
      end
    end
  end
end
