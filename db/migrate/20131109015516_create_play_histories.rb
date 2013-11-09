class CreatePlayHistories < ActiveRecord::Migration
  def change
    create_table :play_histories do |t|
      t.integer :user_id, :null => false
      t.integer :quiz_id, :null => false

      t.timestamps
    end

    add_index :play_histories, [:user_id, :quiz_id]
  end
end
