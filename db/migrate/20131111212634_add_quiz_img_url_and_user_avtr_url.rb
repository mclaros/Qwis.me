class AddQuizImgUrlAndUserAvtrUrl < ActiveRecord::Migration
	def change
		add_column :users, :avatar_url, :string
		add_column :quizzes, :quiz_img_url, :string
	end
end
