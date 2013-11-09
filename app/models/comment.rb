class Comment < ActiveRecord::Base
	attr_accessible :author_id, :body, :parent_comment_id

	validates_presence_of :body
	validates_length_of :body, :maximum => 200

	belongs_to :author,
		:class_name => "User",
		:foreign_key => :author_id,
		:primary_key => :id
	
	belongs_to :parent_comment,
		:class_name => "Comment",
		:foreign_key => :parent_comment_id,
		:primary_key => :id

	has_many :replies,
		:class_name => "Comment",
		:foreign_key => :parent_comment_id,
		:primary_key => :id,
		:dependent => :nullify 
end
