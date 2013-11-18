class SetLimitTo20QuizPrompts < ActiveRecord::Migration
  def change
  	change_column :quiz_prompts, :correct_answer, :string, {:limit => 20, :null => false}
  	change_column :quiz_prompts, :prompt, :string, {:limit => 20}
  end
end
