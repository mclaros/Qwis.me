class CreateValidAnswers < ActiveRecord::Migration
  def change
    create_table :valid_answers do |t|
    	t.integer :goal_answer_id, :null => false
    	t.string :answer, :limit => 30, :null => false

    	t.timestamps
    end
    add_index :valid_answers, :goal_answer_id
  end
end
