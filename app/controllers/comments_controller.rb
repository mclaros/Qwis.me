class CommentsController < ApplicationController
	def index
		@quiz_comments = Quiz.find(params[:quiz_id]).comments

		render :json => @quiz_comments
	end

	def create

	end

	def update

	end

	def destroy

	end
end
