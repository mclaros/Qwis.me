class Quiz < ActiveRecord::Base
	attr_accessible :author_id, :title, :description, :category,
					:scope, :length, :time_limit

	validates_presence_of :author_id, :title, :category, :scope, :length, :time_limit
	validates_length_of :description, :maximum => 150, :allow_blank => true
	validates_length_of :title, :within => 3..50
	validates_length_of :category, :scope, :within => 3..20

	#belongs_to :author
	has_one :quiz_tracker, :dependent => :destroy, :inverse_of => :quiz
	has_many :quiz_prompts, :dependent => :destroy, :inverse_of => :quiz
	#has_one :quiz_perform_tracker

	def self.categories
		cats = [
				"entertainment", "gaming", "geography", "history", "holiday", 
				"just For Fun", "language", "literature", "movies", "music", 
				"odd Qwirks (Misc.)", "religion", "science", "sports", "television"
				]

		return cats
	end

	def self.scopes
		scopes = %w{common amateur expert}
		return scopes
	end

end