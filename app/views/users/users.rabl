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
	node(:created_at) { |played_quiz| played_quiz.created_at.to_time.to_formatted_s(:long_ordinal) }
end

child :favoritings do
	attributes :id, :quiz_id, :user_id
end

child :play_histories do
	attributes :id, :quiz_id, :finished, :finish_time
end

attributes :id, :username, :description, :fav_count, :play_count,
		   :unique_play_count, :win_count, :loss_count, :authored_quizzes_others_plays_count,
		   :authored_quizzes_others_favs_count, :qwismaster_points

node(:created_at) { |user| user.created_at.to_time.to_formatted_s(:long_ordinal) }
node(:avatar_small) { |user| user.avatar.url(:small) }
node(:avatar_big) { |user| user.avatar.url(:big) }
node(:page) { @page }
node(:total_pages) { @total_pages }