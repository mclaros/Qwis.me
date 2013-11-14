collection @users
child :quizzes => :authored_quizzes do
	attributes :id, :author_id, :author_username, :title, :question, :description, :category,
			   :scope, :length, :time_limit, :fav_count, :play_count, :unique_play_count
end

child :favorite_quizzes => :favorite_quizzes do
	attributes :id, :author_id, :author_username, :title, :question, :description, :category,
			   :scope, :length, :time_limit, :fav_count, :play_count, :unique_play_count
end

child :played_quizzes => :played_quizzes do
	attributes :id, :author_id, :author_username, :title, :question, :description, :category,
			   :scope, :length, :time_limit, :fav_count, :play_count, :unique_play_count
end

child :favoritings do
	attributes :id, :quiz_id, :user_id
end
child :play_histories do
	attributes :id, :quiz_id, :finished, :finish_time
end

attributes :id, :created_at, :username, :description, :fav_count, :play_count,
		   :unique_play_count, :win_count, :loss_count, :authored_quizzes_other_plays_count,
		   :authored_quizzes_others_favs_count, :qwismaster_points
		   
node(:avatar_small) { |user| user.avatar.url(:small) }
node(:avatar_big) { |user| user.avatar.url(:big) }