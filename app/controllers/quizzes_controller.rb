class QuizzesController < ApplicationController
	def index
		@quizzes = Quiz
					.includes(:quiz_prompts => :valid_answers)
					.order("created_at DESC")
					.page(params[:page])
					.per(5)

		@page = params[:page]
		@total_pages = @quizzes.total_pages
		respond_to do |format|
			format.html { render :index }
			format.json { render "quizzes.rabl", :handlers => [:rabl] }
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
		@quiz.author_id = current_user.id

		params[:quiz_prompts].each do |prompt_vals|
			prompt_params = prompt_vals.reject {|k| k == "valid_answers"}
			prompt_params[:correct_answer] = prompt_params[:correct_answer].downcase
			prompt = @quiz.quiz_prompts.new(prompt_params)

			unless prompt_vals["valid_answers"].nil?
				prompt_vals["valid_answers"].each do |v_ans_vals|
					p v_ans_vals
					prompt.valid_answers.new(v_ans_vals)
				end
			end
		end
		
		if @quiz.save
			render :json => "#{@quiz.id}".to_json, :status => :ok
		else
			render :json => @quiz.errors.full_messages.to_json, :status => 422
		end
	end
end
