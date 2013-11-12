class CreateFavoritings < ActiveRecord::Migration
  def change
    create_table :favoritings do |t|
      t.integer :quiz_id
      t.integer :user_id

      t.timestamps
    end
      add_index :favoritings, [:quiz_id, :user_id], :unique => true
  end
end
