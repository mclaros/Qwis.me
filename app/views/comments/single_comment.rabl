object @quiz_comment
attributes :id, :author_id, :quiz_id, :parent_comment_id, :body
node(:created_at) { |comment| comment.created_at.httpdate }
child(:replies) do
	attributes :id, :author_id, :quiz_id, :parent_comment_id, :body
	node(:author_username) { |comment| comment.author.username }
	node(:created_at) { |comment| comment.created_at.to_time.to_formatted_s(:long_ordinal) }
end
child :author => :author do
	attributes :id, :username
	node(:avatar_small) { |author| author.avatar.url(:small) }
end