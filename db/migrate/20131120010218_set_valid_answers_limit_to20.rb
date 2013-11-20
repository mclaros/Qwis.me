class SetValidAnswersLimitTo20 < ActiveRecord::Migration
  def change
  	change_column :valid_answers, :valid_answer, :string, {:limit => 20, :null => false}
  end
end
