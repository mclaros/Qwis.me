class StaticPagesController < ApplicationController
	before_filter :authenticate_user!

	def root
		if user_signed_in?
			@quizzes = Quiz.includes(:quiz_prompts => :valid_answers)
			@users = User.all
			p current_user
			@user = User.find(current_user.id)
			render :root
		else
			redirect_to new_user_session_url
		end
	end
end
