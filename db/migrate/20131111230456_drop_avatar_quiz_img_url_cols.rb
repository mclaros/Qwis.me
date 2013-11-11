class DropAvatarQuizImgUrlCols < ActiveRecord::Migration
	def change
		remove_column :users, :avatar_url
		remove_column :quizzes, :quiz_img_url
	end
end
