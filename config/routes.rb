Qwisme::Application.routes.draw do
  devise_for :users, :path_names => { :sign_in => "login", :sign_out => "logout" }

  resource :static_pages, :only => []

  resources :favoritings, :only => [:create, :destroy]
  resources :play_histories, :only => [:create]
  resources :users, :only => [:index, :show] do
  	resources :play_histories, :only => [:index]
  end
  resources :quizzes, :only => [:index, :create] do
  	resources :comments, :only => [:index, :create, :update, :destroy]
  end

  get "/guest", to: "users#guest_login"
  root :to => "static_pages#root"
end
