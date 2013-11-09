class PlayHistory < ActiveRecord::Base
	attr_accessible :quiz_id, :user_id
	validates_presence_of :quiz_id, :user_id

	belongs_to :user
	belongs_to :quiz
end
