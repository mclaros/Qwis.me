Qwisme.Models.Quiz = Backbone.Model.extend({
	urlRoot: "/quizzes",

	parse: function (data) {
		data.quiz_prompts = new Qwisme.Collections.QuizPrompts(
			data.quiz_prompts,
			{ parse: true }
		)

		return data;
	}
});