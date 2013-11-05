class CreateQuestionColForPrompts < ActiveRecord::Migration
  def change
  	add_column :quiz_prompts, :question, :string, {:null => false, :limit => 100}
  end
end
