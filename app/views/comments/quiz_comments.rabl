collection @quiz_comments
attributes :id, :author_id, :quiz_id, :parent_comment_id, :body, :author_username
node(:created_at) { |comment| comment.created_at.httpdate }
child(:replies) do
	attributes :id, :author_id, :quiz_id, :parent_comment_id, :body, :author_username
end