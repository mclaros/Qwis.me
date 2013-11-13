Qwisme::Application.routes.draw do
  devise_for :users, :path_names => { :sign_in => "login", :sign_out => "logout" }

  resource :static_pages, :only => []

  resources :users, :only => [:index, :show] do
    resources :play_histories, :only => [:index]
  end

  resources :quizzes do
    resources :play_histories, :only => [:create]
  	resources :comments, :only => [:index, :create, :update, :destroy]
  end

  root :to => "static_pages#root"
end
