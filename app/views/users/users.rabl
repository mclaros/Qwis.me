collection @users
attributes :id, :created_at, :username, :description
node(:avatar_small) { |user| user.avatar.url(:small) }
node(:avatar_big) { |user| user.avatar.url(:big) }
child(:favorite_quizzes) do
	attributes :id, :title, :description, :category, :scope, :length, :time_limit, :question
end