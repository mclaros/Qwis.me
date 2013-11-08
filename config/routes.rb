Qwisme::Application.routes.draw do
  devise_for :users

  resources :users, :only => [:index, :show]
  resources :quizzes
  resource :static_pages
  get "/quizzes/:id/play", :to => "quizzes#play"
  root :to => "static_pages#root"
end
