Qwisme.Views.QuizFormPreview = Backbone.View.extend({
	template: JST["quiz/quiz_form_preview"],

	render: function (quizFormData) {
		this.quizData = quizFormData.quiz;
		this.quizPromptsDataArr = quizFormData.quiz_prompts;

		console.log("rendering preview");
		console.log("quizData");
		console.log(this.quizData);
		console.log("quizPromptsDataArr");
		console.log(this.quizPromptsDataArr);

		var renderedTemp = this.template({
			quizTitle: _.escape(this.quizData.title),
			quizDescrip: (_.escape(this.quizData.description) || "NO DESCRIPTION"),
			quizLength: _.escape(this.quizData.length),
			quizQuestion: _.escape(this.quizData.question),

		});

		this.$el.html(renderedTemp);
		return this;
	}
});