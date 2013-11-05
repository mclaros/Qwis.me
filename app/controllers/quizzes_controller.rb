class QuizzesController < ApplicationController
	def index
		@quizzes = Quiz.all
		render :index
	end

	def show
		@quiz = Quiz.find(params[:id])
		@prompts = @quiz.quiz_prompts
		render :show
	end

	def new
		@categories = Quiz.categories
		@scopes = Quiz.scopes
		render :new
	end

	def create
		@quiz = Quiz.new(params[:quiz])

		#building quiz prompts
		params[:quiz_prompts].each do |values_hash|
			@quiz.quiz_prompts.new(values_hash)
		end

		#TEMPORARY: set all valid answers to first quiz prompt
		first_prompt = @quiz.quiz_prompts.first
		params[:valid_answers].each do |values_hash|
			first_prompt.valid_answers.new(values_hash)
		end
		
		#TEMPORARY: will set to current_user later
		@quiz.author_id = 1

		if @quiz.save
			redirect_to quiz_url(@quiz)
		else
			flash[:notices] = @quiz.errors.full_messages
			redirect_to new_quiz_url
		end
	end
end
