class QuizzesController < ApplicationController
	def index
		@quizzes = Quiz.includes(:quiz_prompts => :valid_answers)

		# render "quizzes.rabl", handlers: [:rabl]
		respond_to do |format|
			format.html { render :index }
			format.json { render "quizzes.rabl", handlers: [:rabl] }
		end
	end

	def show
		@quiz = Quiz.find(params[:id])
		@prompts = @quiz.quiz_prompts
		render :show
	end

	def play
		@quiz = Quiz.find(params[:id])
		@prompts = @quiz.quiz_prompts
		
		respond_to do |format|
			format.html { render :play }
			format.json { render :json => @quiz.game_data.to_json }
		end
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

		#reverse to set to user-created order
		params[:quiz_prompts] = prompt_params.reverse

		#building quiz_prompts, and their valid_answers
		params[:quiz_prompts].each do |prompt_vals|
			prompt_params = prompt_vals.reject {|k| k == "valid_answers"}
			prompt = @quiz.quiz_prompts.new(prompt_params)

			#build prompt's valid_answers
			unless prompt_vals["valid_answers"].nil?
				prompt_vals["valid_answers"].each do |v_ans_vals|
					prompt.valid_answers.new(v_ans_vals)
				end
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
