class CreateGoalAnswers < ActiveRecord::Migration
  def change
    create_table :goal_answers do |t|
    	t.integer :quiz_id, :null => false
    	t.string :correct_answer, :limit => 30, :null => false

    	t.timestamps
    end
  end
end
