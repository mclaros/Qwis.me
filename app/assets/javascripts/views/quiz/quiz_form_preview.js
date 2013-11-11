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
			quizTitle: this.validate(this.quizData, "title", 3, 50),
			quizDescription: _.escape(this.quizData.description) || "<span class='text-warning'>NO DESCRIPTION</span>",
			quizLength: _.escape(this.quizData.length) || 1,
			quizQuestion: _.escape(this.quizData.question) || this.dangerize("MISSING QUESTION"),
			quizScope: _.str.capitalize(_.escape(this.quizData.scope)) || this.dangerize("MISSING"),
			quizCategory: _.str.capitalize(_.escape(this.quizData.category)) || this.dangerize("MISSING"),
			quizTimeLimit: _.escape(this.quizData.time_limit) || 1
		});

		this.$el.html(renderedTemp);
		return this;
	},

	validate: function (source, type, minChars, maxChars) {
		console.log(source)
		var str = _.str.capitalize(_.escape(source[type]));
		
		if (minChars === 0 && str.length === 0) {
			var includeType = !_.contains(["category", "scope"], type);
			return this.dangerize("MISSING" + (includeType ? " " + type.toUpperCase() : ""));
		}
		else if (str.length > maxChars) {
			return this.dangerize("TOO LONG");
		}
		else if (str.length < minChars) {
			return this.dangerize("TOO SHORT");
		}
		else {
			return str;
		}
	},

	dangerize: function (string) {
		return "<span class='text-danger'>" + string + "</span>";
	}
});