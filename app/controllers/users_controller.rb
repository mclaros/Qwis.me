class UsersController < ApplicationController
	def index
		@users = User.includes({:quizzes => [:play_histories, :favoritings]}, :favorite_quizzes, :play_histories, :played_quizzes)

		render "users.rabl", :handlers => [:rabl]
		# respond_to do |format|
		# 	format.html { render :index }
		# 	format.json { render "users.rabl", :handlers => [:rabl] }
		# end
	end

	def show
		@user = User.where(:id => params[:id]).includes({:quizzes => [:play_histories, :favoritings]}, :favorite_quizzes, :play_histories, :played_quizzes)
		render "user.rabl", :handlers => [:rabl]
		# respond_to do |format|
		# 	format.html { render :show }
		# 	format.json { render :json => @user }
		# end
	end
end
