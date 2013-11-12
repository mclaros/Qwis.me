Qwisme::Application.routes.draw do
  devise_for :users, :path_names => { :sign_in => "login", :sign_out => "logout" }

  resource :static_pages, :only => []

  resources :users, :only => [:index, :show]

  resources :quizzes do
  	resources :comments, :only => [:index, :create, :update, :destroy]
  end

  root :to => "static_pages#root"
end
