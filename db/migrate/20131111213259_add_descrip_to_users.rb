class AddDescripToUsers < ActiveRecord::Migration
	def change
		add_column :users, :description, :string, {:limit => 150}
	end
end
