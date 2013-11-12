class ChangeQuizIdColToIntegerFavoritings < ActiveRecord::Migration
	def chage
		change_column :favoritings, :quiz_id, :integer, :null => false
	end
end
