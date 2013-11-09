class AddQuizIdColumnToComment < ActiveRecord::Migration
	def change
		add_column :comments, :quiz_id, :integer, :null=> false
	end
end
