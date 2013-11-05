# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

q1 = Quiz.create!(
			author_id: 1, title: "first quiz!", description: "first descrip", category: "games",
			scope: "common", length: 1, time_limit: 5
			)
gp1 = QuizPrompt.create!(
			question: "What is love?", correct_answer: "Baby don't hurt me", quiz_id: q1.id
			)
va1 = ValidAnswer.create!(quiz_prompt_id: gp1.id, valid_answer: "no mo")
