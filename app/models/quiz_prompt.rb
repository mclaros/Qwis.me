class QuizPrompt < ActiveRecord::Base
  attr_accessible :correct_answer, :question, :quiz_id

  validates_presence_of :quiz, :correct_answer, :question
  validates_length_of :correct_answer, :maximum => 30
  validates_length_of :question, :within => 3..100

  belongs_to :quiz
  has_many :valid_answers, :dependent => :destroy, :inverse_of => :quiz_prompt
end
