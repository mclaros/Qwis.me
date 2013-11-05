class DeleteQuizStatsFromQuizTable < ActiveRecord::Migration
	def change
		remove_columns :quizzes, :play_count, :uniq_play_count, :fav_count
	end
end
