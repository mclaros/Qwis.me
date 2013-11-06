Qwisme.Models.QuizPrompt = Backbone.Model.extend({
	parse: function (data) {
		data.valid_answers = new Qwisme.Collections.ValidAnswers(
			data.valid_answers,
			{ parse: true }
		)
		return data;
	},

	isAnswer: function (trimmedStr) {
		var posAnsrs = this.posAnswers();
		return _.contains(posAnsrs, trimmedStr);
	},

	posAnswers: function () {
		var posAnsrs = this.pluck("valid_answer");
		return [this.get("correct_answer")].concat(posAnsrs);
	}
});