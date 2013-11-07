class AllowBlankPromptsNotQuestion < ActiveRecord::Migration
	def change
		change_column :quiz_prompts, :prompt, :string, {:limit => 30, :null => true}
		change_column :quizzes, :question, :string, {:limit => 100, :null => false}
	end
end
