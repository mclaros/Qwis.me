class MoveQuestionToQuiz < ActiveRecord::Migration
	def change
		add_column :quizzes, :question, :string, {:null => false, :limit => 100}
		change_column :quiz_prompts, :question, :string, {:limit => 30}
		rename_column :quiz_prompts, :question, :prompt
	end
end
