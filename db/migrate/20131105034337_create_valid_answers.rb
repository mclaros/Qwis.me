class CreateValidAnswers < ActiveRecord::Migration
  def change
    create_table :valid_answers do |t|
      t.integer :quiz_prompt_id, :null => false
      t.string :valid_answer, :null => false, :limit => 30

      t.timestamps
    end
    add_index :valid_answers, :quiz_prompt_id
  end
end
