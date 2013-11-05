class CreateQuizTrackers < ActiveRecord::Migration
  def change
    create_table :quiz_trackers do |t|
      t.integer :quiz_id, :null => false
      t.integer :play_count, :null => false, :default => 0
      t.integer :unique_play_count, :null => false, :default => 0
      t.integer :fav_count, :null => false, :default => 0

      t.timestamps
    end
    add_index :quiz_trackers, :quiz_id
  end
end
