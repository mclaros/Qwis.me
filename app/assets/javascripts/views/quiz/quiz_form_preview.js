Qwisme.Views.QuizFormPreview = Backbone.View.extend({
	template: JST["quiz/quiz_form_preview"],

	render: function (quizFormData) {
		this.quizData = quizFormData.quiz || {};
		this.quizPromptsDataArr = quizFormData.quiz_prompts || {};

		console.log("rendering preview");
		console.log("quizData");
		console.log(this.quizData);
		console.log("quizPromptsDataArr");
		console.log(this.quizPromptsDataArr);

		var renderedTemp = this.template({
			quizTitle: _.escape(this.quizData.title) || "MISSING TITLE",
			quizDescription: _.escape(this.quizData.description) || "NO DESCRIPTION",
			quizLength: _.escape(this.quizData.length),
			quizQuestion: _.escape(this.quizData.question) || "MISSING QUESTION",
			quizScope: _.str.capitalize(_.escape(this.quizData.scope)) || "MISSING",
			quizCategory: _.str.capitalize(_.escape(this.quizData.category)) || "MISSING",
			quizTimeLimit: _.escape(this.quizData.time_limit) || 1
		});

		this.$el.html(renderedTemp);
		return this;
	}
});