class GoalAnswer < ActiveRecord::Base
	attr_accessible :quiz_id, :correct_answer

	validates_presence_of :quiz_id, :correct_answer
	validates_length_of :correct_answer, :maximum => 30
end
