class DeletePromptColFromQuizzes < ActiveRecord::Migration
  def change
  	remove_column :quizzes, :prompt
  end
end
