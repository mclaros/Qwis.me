class CommentsController < ApplicationController
	def index
		@quiz_comments = Comment.where(:quiz_id => params[:quiz_id]).includes(:author, :replies)
		render "quiz_comments.rabl", :handlers => [:rabl]
	end

	def create
		@quiz_comment = Comment.new(params[:comment])
		@quiz_comment.author_id = current_user.id

		if @quiz_comment.save
			render "single_comment.rabl", :handlers => [:rabl]
		else
			render :json => @quiz_comment.errors.full_messages
		end
	end

	def update

	end

	def destroy

	end
end
