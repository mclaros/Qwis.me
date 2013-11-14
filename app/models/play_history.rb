class PlayHistory < ActiveRecord::Base
	attr_accessible :quiz_id, :user_id, :finish_time, :finished
	validates :finished, :inclusion => { in: [true, false] }
	validates_presence_of :quiz_id, :user_id, :finish_time

	#finish_time in seconds

	belongs_to :user
	belongs_to :quiz
end