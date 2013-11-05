class QuizPrompt < ActiveRecord::Base
  attr_accessible :correct_answer, :quiz_id

  validates_presence_of :quiz_id, :correct_answer
  validates_length_of :correct_answer, :maximum => 30

  belongs_to :quiz
  has_many :valid_answers, :dependent => :destroy, :inverse_of => :quiz_prompt
end
