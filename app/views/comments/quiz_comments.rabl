collection @quiz_comments
attributes :id, :author_id, :quiz_id, :parent_comment_id, :body
# child(:replies) do
# 	attributes :id, :author_id, :quiz_id, :parent_comment_id, :body
# end