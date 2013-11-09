class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :timeoutable and :omniauthable
 	devise :database_authenticatable, :registerable,
	    :recoverable, :rememberable, :trackable, :validatable

	attr_accessible :email, :password, :password_confirmation, :remember_me, 
		:username # :tagline, :avtar**
  
  	validates_length_of :username, :within => 3..15

	#has_one :user_tracker
	#has_many :comments, :dependent => :nullify
	#has_many :favoritings** and has favorite through
	has_many :quizzes,
		:class_name => "Quiz",
		:foreign_key => :author_id,
		:primary_key => :id,
		:inverse_of => :author,
		:dependent => :nullify
end
