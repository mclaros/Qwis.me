class QuizzesController < ApplicationController
	def index
		@quizzes = Quiz.all
		render :index
	end

	def show
		@quiz = Quiz.find(params[:id])
		render :show
	end

	def new
		@categories = Quiz.categories
		@scopes = Quiz.scopes
		render :new
	end

	def create
		@quiz = Quiz.new(params[:quiz])
		
		#TEMPORARY, will set to current_user later
		@quiz.author_id = 1

		if @quiz.save
			redirect_to quiz_url(@quiz)
		else
			flash[:notices] = @quiz.errors.full_messages
			redirect_to new_quiz_url
		end
	end
end
