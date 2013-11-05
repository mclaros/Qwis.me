Qwisme::Application.routes.draw do
  resources :quizzes
  root :to => "quizzes#index"
end
