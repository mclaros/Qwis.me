collection @quizzes
attributes :id, :author_id, :author_username, :title, :question, :description, :category,
		   :scope, :length, :time_limit, :game_data
node(:has_favorited) { |quiz| quiz.favoritings.exists?(:user_id => current_user.id) }
node(:has_played) { |quiz| quiz.play_histories.exists?(:user_id => current_user.id) }
child(:quiz_prompts) do 
	attributes :id, :correct_answer, :prompt, :quiz_id
	child(:valid_answers) do
		attributes :id, :quiz_prompt_id, :valid_answer
	end
end
child(:comments) do
	attributes :id, :author_id, :parent_comment_id, :quiz_id, :body
	child(:replies) do
		attributes :id, :author_id, :parent_comment_id, :quiz_id, :body
	end
end