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

	has_attached_file :avatar, :styles => {
		:big => "200x200>",
		:small => "65x65>"
	}
end
