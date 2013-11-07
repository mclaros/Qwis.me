class StaticPagesController < ApplicationController
	def root
		@quizzes = Quiz.includes(:quiz_prompts => :valid_answers)
		render :root
	end
end
