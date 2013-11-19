class StaticPagesController < ApplicationController
	before_filter :authenticate_user!

	def root
		if user_signed_in?
			@quizzes = Quiz
						.includes(:quiz_prompts => :valid_answers)
						.order("created_at DESC")
						.page(params[:page])
						.per(1)

			@page = params[:page] || 1
			@total_pages = @quizzes.total_pages
			@user = User
						.where(:id => current_user.id)
						.includes({:quizzes => [:play_histories, :favoritings]}, :favorite_quizzes, :play_histories, :played_quizzes)
						.first

			render :root
		else
			redirect_to new_user_session_url
		end
	end
end
