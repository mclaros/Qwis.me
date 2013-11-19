class QuizPrompt < ActiveRecord::Base
  attr_accessible :correct_answer, :prompt, :quiz_id

  validates_presence_of :quiz, :correct_answer
  validates_length_of :correct_answer, :prompt, :maximum => 20

  belongs_to :quiz
  has_many :valid_answers, :dependent => :destroy, :inverse_of => :quiz_prompt

  def build_valid_answers(valid_answers_params)
  	valid_answers_params.each do |v_ans_params|
  		v_ans_params[:valid_answer].downcase!
  		self.valid_answers.new(v_ans_params)
  	end
  end

  def possible_answers
  	pos_answers = [self.correct_answer]
	pos_answers.concat(self.valid_answers.pluck(:valid_answer))
  end
end
