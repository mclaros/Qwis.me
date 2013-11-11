class UsersController < ApplicationController
	def index
		@users = User.all

		respond_to do |format|
			format.html { render :index }
			format.json { render "users.rabl", :handlers => [:rabl] }
		end
	end

	def show
		@user = User.find(params[:id])
		respond_to do |format|
			format.html { render :show }
			format.json { render :json => @user }
		end
	end
end
