Qwisme.Models.Quiz = Backbone.Model.extend({
	urlRoot: "/quizzes",

	parse: function (data) {
		var that = this;
		data.quiz_prompts = new Qwisme.Collections.QuizPrompts(
			data.quiz_prompts,
			{ parse: true }
			)


		var comments = new Qwisme.Collections.Comments({
			quizID: data.id
		});
		comments.add(data.comments);
		data.comments = comments;
	
		console.log("data.comments parsed is")
		console.log(data.comments)

		return data;
	},

	allPosAnswers: function () {
		var posAnswers = [];
		this.get("quiz_prompts").each(function (prompt) {
			posAnswers.push(prompt.get("correct_answer"));
			var otherAnswers = prompt.get("valid_answers").pluck("valid_answer");
			posAnswers = posAnswers.concat(otherAnswers);
		});

		return posAnswers;
	}
});