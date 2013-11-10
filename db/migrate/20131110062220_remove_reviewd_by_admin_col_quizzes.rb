class RemoveReviewdByAdminColQuizzes < ActiveRecord::Migration
	def change
		remove_column :quizzes, :reviewed_by_mod
	end
end
