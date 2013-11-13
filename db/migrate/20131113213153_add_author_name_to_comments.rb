class AddAuthorNameToComments < ActiveRecord::Migration
  def change
  	add_column :comments, :author_username, :string, {:limit => 15, :null => false}
  end
end
