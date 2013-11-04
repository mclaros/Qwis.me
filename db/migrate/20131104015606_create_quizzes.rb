class CreateQuizzes < ActiveRecord::Migration
  def change
    create_table :quizzes do |t|
    	t.integer :author_id, :null => false

    	t.string :title, :limit => 50, :null => false
    	t.string :description, :limit => 150
    	t.string :category, :limit => 20, :null => false
    	t.string :scope, :limit => 20, :null => false, :default => "common"
    	t.string :prompt, :limit => 100, :null => false

    	t.boolean :reviewed_by_mod, :default => false

    	t.integer :length, :null => false
    	t.integer :time_limit, :null => false
    	t.integer :play_count, :null => false, :default => 0
    	t.integer :uniq_play_count, :null => false, :default => 0
    	t.integer :fav_count, :null => false, :default => 0

    	t.timestamps
    end
  end
end
