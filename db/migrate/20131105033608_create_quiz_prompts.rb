class CreateQuizPrompts < ActiveRecord::Migration
  def change
    create_table :quiz_prompts do |t|
      t.integer :quiz_id, :null => false
      t.string :correct_answer, :null => false, :limit => 30

      t.timestamps
    end
    add_index :quiz_prompts, :quiz_id
  end
end
