class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :author_id
      t.integer :parent_comment_id
      t.string :body, :null => false, :limit => 200

      t.timestamps
    end
    add_index :comments, :author_id
    add_index :comments, :parent_comment_id
  end
end
