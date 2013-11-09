class StaticPagesController < ApplicationController
	def root
		if user_signed_in?
			@quizzes = Quiz.includes(:quiz_prompts => :valid_answers)
			render :root
		else
			redirect_to new_user_session_url
		end
	end
end
