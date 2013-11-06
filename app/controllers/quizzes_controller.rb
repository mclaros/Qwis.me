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

	def play
		@quiz = Quiz.find(params[:id])
		@prompts = @quiz.quiz_prompts
		@prompt_answers_hash_JSON = {}
		@prompts.each do |prompt|
			@prompt_answers_hash_JSON[prompt.question] = prompt.possible_answers
		end
		@prompt_answers_hash_JSON = @prompt_answers_hash_JSON.to_json

		render :play
	end

	def new
		@categories = Quiz.categories
		@scopes = Quiz.scopes
		render :new
	end

	def create
		@quiz = Quiz.new(params[:quiz])
		#TEMPORARY: will set to current_user later
		@quiz.author_id = 1

		#building quiz_prompts, and their valid_answers
		params[:quiz_prompts].each do |prompt_vals|
			prompt_params = prompt_vals.reject {|k| k == "valid_answers"}
			prompt = @quiz.quiz_prompts.new(prompt_params)

			#build prompt's valid_answers
			prompt_vals["valid_answers"].each do |v_ans_vals|
				prompt.valid_answers.new(v_ans_vals)
			end
		end
		
		if @quiz.save
			redirect_to quiz_url(@quiz)
		else
			flash[:notices] = @quiz.errors.full_messages
			redirect_to new_quiz_url
		end
	end
end
