class UsersController < ApplicationController
	def index
		@users = User
					.includes(
						{:quizzes => [:play_histories, :favoritings]}, 
						:favorite_quizzes, :play_histories, :played_quizzes
						)
					.order("created_at DESC")
					.page(params[:page] || 1)
					.per(5)

		@page = params[:page] || 1
		@total_pages = @users.total_pages
		# render "users.rabl", :handlers => [:rabl]
		respond_to do |format|
			format.json { render "users.rabl", :handlers => [:rabl] }
		end
	end

	def show
		@user = User.where(:id => params[:id]).includes({:quizzes => [:play_histories, :favoritings]}, :favorite_quizzes, :play_histories, :played_quizzes)
		# render "user.rabl", :handlers => [:rabl]
		respond_to do |format|
			format.json { render "user.rabl", :handlers => [:rabl] }
		end
	end

	def guest_login
		guest_nums = (1..5).to_a
		guest_user = User.find_by_username("guest#{guest_nums.sample}")
		sign_in_and_redirect(guest_user)
	end
end
