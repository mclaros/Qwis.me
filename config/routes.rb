Qwisme::Application.routes.draw do
  devise_for :users, :path_names => { :sign_in => "login", :sign_out => "logout" }

  resources :users, :only => [:index, :show]
  resource :static_pages, :only => []
  resources :quizzes do
  	resources :comments, :only => [:index, :create, :update, :destroy]
  	resources :play_histories, :only => [:create]
  	resources :favoritings, :only => [:create, :destroy]
  end

  get "/quizzes/:id/play", :to => "quizzes#play" #obsolete with backbone
  root :to => "static_pages#root"
end
