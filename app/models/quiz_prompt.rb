class QuizPrompt < ActiveRecord::Base
  attr_accessible :correct_answer, :prompt, :quiz_id

  validates_presence_of :quiz, :correct_answer
  validates_length_of :correct_answer, :within => 3..30
  validates_length_of :prompt, :maximum => 30

  belongs_to :quiz
  has_many :valid_answers, :dependent => :destroy, :inverse_of => :quiz_prompt

  def possible_answers
  	pos_answers = [self.correct_answer]
	pos_answers.concat(self.valid_answers.pluck(:valid_answer))
  end
end
