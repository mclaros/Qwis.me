class Quiz < ActiveRecord::Base
	attr_accessible :author_id, :title, :description, :category,
					:prompt, :scope, :length, :time_limit

	validates_presence_of :author_id, :title, :category, :scope, :prompt, :length, :time_limit
	validates_length_of :description, :maximum => 150, :allow_blank => true
	validates_length_of :prompt, :within => 5..100
	validates_length_of :title, :within => 3..50
	validates_length_of :category, :scope, :within => 3..20
end
