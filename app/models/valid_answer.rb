class ValidAnswer < ActiveRecord::Base
	attr_accessible :answer, :goal_answer_id

	validates_presence_of :answer, :goal_answer_id
	validates_length_of :answer, :maximum => 30
end
