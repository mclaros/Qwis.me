class Quiz < ActiveRecord::Base
	attr_accessible :author_id, :title, :description, :category,
					:scope, :length, :time_limit, :question, :quiz_img

	validates_presence_of :author_id, :title, :category, :scope, :length, :time_limit, :question
	validates_length_of :description, :maximum => 150, :allow_blank => true
	validates_length_of :question, :within => 3..100
	validates_length_of :title, :within => 3..50
	validates_length_of :category, :scope, :within => 3..20
	validates_uniqueness_of :title, :scope => [:author_id], :message => "has already been used"

	belongs_to :author,
		:class_name => "User",
		:foreign_key => :author_id,
		:primary_key => :id
	has_many :quiz_prompts, :dependent => :destroy, :inverse_of => :quiz
	has_many :comments, :dependent => :destroy
	has_many :play_histories #:dependent => :nullify???
	has_many :favoritings, :dependent => :destroy

	def self.categories
		#obsolete if set in backbone
		cats = [
				"entertainment", "gaming", "geography", "history", "holiday", 
				"just For Fun", "language", "literature", "movies", "music", 
				"odd Qwirks (Misc.)", "religion", "science", "sports", "television"
				]

		return cats
	end

	def self.scopes
		#obsolete if set in backbone
		scopes = %w{common amateur expert}
		return scopes
	end

	def author_username
		User.find(self.author_id).username
	end

	def game_data
		prompts = self.quiz_prompts
		prompt_id_to_ans = {}
		ans_to_prompt_id = {}

		prompts.each do |prompt|
			if prompt_id_to_ans[prompt.id].nil?
				prompt_id_to_ans[prompt.id] = prompt.possible_answers
			else
				prompt_id_to_ans[prompt.id].concat(prompt.possible_answers)
			end
			
			prompt.possible_answers.each do |pos_ans|
				ans_to_prompt_id[pos_ans] = prompt.id
			end
		end

		ans_data = {
				"prompt_id_to_ans" => prompt_id_to_ans, 
				"ans_to_prompt_id" => ans_to_prompt_id 
				}
		return ans_data
	end

	def has_favorited
		self.favoritings.exists?(:user_id => current_user.id)
	end

	def has_played
		self.play_histories.exists?(:user_id => current_user.id)
	end


end