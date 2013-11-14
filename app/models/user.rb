class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :timeoutable and :omniauthable
 	devise :database_authenticatable, :registerable,
	    :recoverable, :rememberable, :trackable, :validatable

	attr_accessible :email, :password, :password_confirmation, :remember_me, 
		:username, :description, :avatar

  	validates_length_of :username, :within => 3..15
  	validates_length_of :description, :maximum => 150

  	has_many :play_histories #:dependent => :nullify???
  	has_many :favoritings, :dependent => :destroy
	has_many :comments,
		:class_name => "User",
		:foreign_key => :author_id,
		:primary_key => :id,
		:dependent => :nullify
	has_many :quizzes,
		:class_name => "Quiz",
		:foreign_key => :author_id,
		:primary_key => :id,
		:inverse_of => :author,
		:dependent => :nullify

	has_many :favorite_quizzes, :through => :favoritings, :source => :quiz
	has_many :played_quizzes, :through => :play_histories, :source => :quiz

	has_attached_file :avatar, :styles => {
		:big => "200x200>",
		:small => "65x65>"
	}

	def fav_count
		@fav_count = self.favoritings.count
	end

	def play_count
		@play_count = self.play_histories.count
	end

	def unique_play_count
		@unique_play_count = PlayHistory.select("COUNT(quiz_id)").where(:user_id => self.id).group(:quiz_id).length
	end

	def win_count
		#WARNING: allows you to mine your own quiz for wins
		@win_count = self.play_histories.where(:finished => true).count
	end

	def loss_count
		@loss_count = self.play_histories.where(:finished => false).count
	end

	def authored_quizzes_others_plays_count
		@others_plays_count = 0
		self.quizzes.each do |quiz|
			@others_plays_count += quiz.play_histories.where("user_id != #{self.id}").count
		end
		@others_plays_count
	end

	def authored_quizzes_others_favs_count
		@others_favs_count = 0
		self.quizzes.each do |quiz|
			@others_favs_count += quiz.favoritings.where("user_id != #{self.id}").count
		end
		@others_favs_count
	end

	def qwismaster_points
		#points for new record?
		points_from_others_favs = 20 * (@others_favs_count || self.authored_quizzes_others_favs_count)
		points_from_others_plays = 10 * (@others_plays_count || self.authored_quizzes_others_plays_count)
		points_from_win_count = 5 * (@win_count || self.win_count)
		points_from_play_count = 1 * (@play_count || self.loss_count)
		@qwismaster_points = points_from_others_favs + 
							 points_from_others_plays + 
							 points_from_win_count + 
							 points_from_play_count
	end
end
