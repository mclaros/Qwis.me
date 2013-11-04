# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

q1 = Quiz.create!(
			author_id: 1, title: "first quiz!", description: "first descrip", category: "games", 
			prompt: "What is love?", scope: "common", length: 1, time_limit: 5
			)
q2 = Quiz.create!(
			author_id: 1, title: "second quiz!", category: "sports", 
			prompt: "Another question?", scope: "amateur", length: 2, time_limit: 5
			)
q3 = Quiz.create!(
			author_id: 2, title: "third quiz!", description: "third descrip", category: "geography", 
			prompt: "Smallest coutries", scope: "expert", length: 5, time_limit: 5
			)

ga1 = GoalAnswer.create!(quiz_id: q1.id, correct_answer: "Baby don't hurt me")
ga2 = GoalAnswer.create!(quiz_id: q1.id, correct_answer: "second")
ga3 = GoalAnswer.create!(quiz_id: q1.id, correct_answer: "third")
ga4 = GoalAnswer.create!(quiz_id: q1.id, correct_answer: "fourth")


va1 = ValidAnswer.create!(answer: "dont hurt me", goal_answer_id: ga1.id)
va2 = ValidAnswer.create!(answer: "no mo", goal_answer_id: ga1.id)
va3 = ValidAnswer.create!(answer: "no mo'", goal_answer_id: ga1.id)
