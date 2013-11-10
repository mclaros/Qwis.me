class Favoriting	 < ActiveRecord::Base
	attr_accessible :quiz_id, :user_id

	validates_presence_of :quiz_id, :user_id
	validates_uniqueness_of :quiz_id, :scope => [:user_id]

	belongs_to :user
	belongs_to :quiz
end
