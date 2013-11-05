class QuizTracker < ActiveRecord::Base
	attr_accessible :fav_count, :play_count, :quiz_id, :unique_play_count

	validates_presence_of :quiz

	belongs_to :quiz
end
