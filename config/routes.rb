Qwisme::Application.routes.draw do
  resources :quizzes
  get "/quizzes/:id/play", :to => "quizzes#play"
  root :to => "quizzes#index"
end
