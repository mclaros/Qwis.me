Qwisme::Application.routes.draw do
  resources :quizzes
  resource :static_pages
  get "/quizzes/:id/play", :to => "quizzes#play"
  root :to => "static_pages#root"
end
