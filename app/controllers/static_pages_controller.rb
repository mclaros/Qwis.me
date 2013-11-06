class StaticPagesController < ApplicationController
	def root
		@quizzes = Quiz.all
		render :root
	end
end
