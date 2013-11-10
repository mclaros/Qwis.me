class CreateFavoritings < ActiveRecord::Migration
	def change
    	create_table :favoritings do |t|
      	t.integer :user_id, :null => false
      	t.string :quiz_id, :null => false

      	t.timestamps
  		end

  		add_index :favoritings, [:user_id, :quiz_id], :unique => true
	end
end
