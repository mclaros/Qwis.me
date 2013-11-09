class Comment < ActiveRecord::Base
  attr_accessible :author_id, :body, :parent_comment_id

  validates_presence_of :body
  validates_length_of :body, :maximum => 200
end
