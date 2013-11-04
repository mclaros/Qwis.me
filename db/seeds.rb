# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Quiz.create!(
			author_id: 1, title: "first quiz!", description: "first descrip", category: "games", 
			prompt: "What is love?", scope: "common", length: 1, time_limit: 5
			)
Quiz.create!(
			author_id: 1, title: "second quiz!", category: "sports", 
			prompt: "Another question?", scope: "amateur", length: 2, time_limit: 5
			)
Quiz.create!(
			author_id: 2, title: "third quiz!", description: "third descrip", category: "geography", 
			prompt: "Smallest coutries", scope: "expert", length: 5, time_limit: 5
			)
