class AddCompletedCompleteTimeColsToPlayHist < ActiveRecord::Migration
	def change
		add_column :play_histories, :finished, :boolean, :null => false
		add_column :play_histories, :finish_time, :integer, :null => false
	end
end
