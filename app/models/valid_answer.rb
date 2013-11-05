class ValidAnswer < ActiveRecord::Base
	attr_accessible :quiz_prompt_id, :valid_answer

	validates_presence_of :quiz_prompt_id, :valid_answer
	validates_length_of :valid_answer, :maximum => 30

	belongs_to :quiz_prompt
end
