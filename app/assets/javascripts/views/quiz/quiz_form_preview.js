Qwisme.Views.QuizFormPreview = Backbone.View.extend({
	template: JST["quiz/quiz_form_preview"],

	render: function (quizFormData) {
		this.quizData = quizFormData.quiz || {};
		this.quizPromptsDataArr = quizFormData.quiz_prompts || {};
		this.quizPromptsDataArr = _.reject(this.quizPromptsDataArr, function (data) {
			return _.isUndefined(data.correct_answer);
		});

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
		this.genAnswerDivPrevs();
		return this;
	},

	validate: function (source, type, minChars, maxChars) {
		var specialFormat = ["category","scope"];
		var string = _.escape(source[type]);

		if ( _.contains(specialFormat, type) ) {
			string = _.str.capitalize(string);
		}
		
		if (minChars === 0 && _.isBlank(string)) {
			var includeType = !_.contains(specialFormat, type);
			return this.dangerize("MISSING" + (includeType ? " " + type.toUpperCase() : ""));
		}
		else if (string.length > maxChars) {
			return this.dangerize("TOO LONG");
		}
		else if (string.length < minChars) {
			return this.dangerize(type.toUpperCase() + " TOO SHORT");
		}
		else {
			return string;
		}
	},

	dangerize: function (string) {
		return "<span class='text-danger'>" + string + "</span>";
	},

	genAnswerDivPrevs: function () {
		var that = this;
		_.each(this.quizPromptsDataArr, function (promptData) {
			var correctAns = _.escape(promptData.correct_answer);
			var ansHeader = _.escape(promptData.prompt);

			if (ansHeader === "") {
				that.genSimpleAnsDivPrevs({
					correctAns: correctAns,
					$container: that.$el.find("#simple-ans-prev")
				});
			}
			else {
				that.genAnsWithHeaderDivPrevs({
					correctAns: correctAns,
					ansHeader: ansHeader,
					$container: that.$el.find("ans-with-header-prev")
				})
			}
		});
	},

	genSimpleAnsDivPrevs: function (options) {
		console.log("generating simple ans div")
		var correctAns = options.correctAns;
		var $container = options.$container;
		var $newAnsDiv = this.$el.find("#simple-ans-proto").clone();

		$newAnsDiv.attr("id", "");
		$newAnsDiv.find(".ans-text").text(correctAns);
		$container.append($newAnsDiv);
	},

	genAnsWithHeaderDivPrevs: function (options) {
		console.log("generating answer div with header")
		var correctAns = options.correctAns;
		var ansHeader = options.ansHeader;
		var $container = options.$container;
		var $newAnsWithHeaderDiv = this.$el.find("#ans-with-header-proto").clone();

		$newAnsWithHeaderDiv.attr("id", "");
		$newAnsWithHeaderDiv.find(".ans-header").text(ansHeader);
		$newAnsWithHeaderDiv.find(".ans-text").text(correctAns);
		$container.append($newAnsWithHeaderDiv);
	},

	genAnsWithImgDivPrevs: function (options) {
		var $container = this.$el.find("#ans-with-img-prev");

	}
});