class PlayHistoriesController < ApplicationController
	def create
		@play_history = PlayHistory.new(params[:play_history])
		@play_history.user_id = current_user.id
		p params
		if @play_history.save
			render :json => @play_history
		else
			render :json => @play_history.errors.full_messages, :status => 422
		end		
	end

	def index
		@play_histories = PlayHistory.where(:user_id => params[:user_id])
		render :json => @play_histories
	end
end