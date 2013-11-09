class AllowNullAuthorIdQuizzes < ActiveRecord::Migration
  def change
  	change_column :quizzes, :author_id, :integer, :null => true
  end
end
