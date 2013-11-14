class FavoritingsController < ApplicationController
	def create
		@favoriting = Favoriting.new(params[:favoriting])
		@favoriting.user_id = current_user.id

		if @favoriting.save
			render :json => @favoriting
		else
			render :json => @favoriting.errors.full_messages.to_json
		end
	end

	def destroy
		@favoriting = Favoriting.find(params[:id])
		@favoriting.destroy
		render :json => "Favoriting destroyed".to_json, :status => :ok
	end
end
