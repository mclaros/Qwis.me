class RemoveUniqPlayCountFavCountFromQuizTracker < ActiveRecord::Migration
	def change
		remove_columns :quiz_trackers, :unique_play_count, :fav_count
	end
end
