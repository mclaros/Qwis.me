collection @quizzes
attributes :id, :author_id, :title, :description, :category,
		   :scope, :length, :time_limit
child(:quiz_prompts) do 
	attributes :id, :correct_answer, :question, :quiz_id
	child(:valid_answers) do
		attributes :id, :quiz_prompt_id, :valid_answer
	end
end