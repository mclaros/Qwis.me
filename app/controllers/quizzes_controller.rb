class QuizzesController < ApplicationController
	def index
		@quizzes = Quiz
					.includes({:quiz_prompts => :valid_answers}, :favoritings, :play_histories)
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

	def create
		@quiz = Quiz.build_full(params)
		@quiz.author_id = current_user.id
		
		if @quiz.save
			render :json => "#{@quiz.id}".to_json, :status => :ok
		else
			render :json => @quiz.errors.full_messages.to_json, :status => 422
		end
	end
end
