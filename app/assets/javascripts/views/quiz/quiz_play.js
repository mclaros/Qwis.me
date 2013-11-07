Qwisme.Views.QuizPlay = Backbone.View.extend({
	template: JST["quiz/quiz_play"],

	render: function () {
		console.log("rendering play");
		console.log("model is");
		console.log(this.model);

		var renderedTemp = this.template({
			quiz: this.model,
			prompts: this.model.get("quiz_prompts")
		});

		var posAnswers = this.model.posAnswers();
		var gameData = this.model.get("game_data");
		var quesToAns = gameData.ques_to_ans;
		var ansToQues = gameData.ans_to_ques;
		var $ansContainer = renderedTemp.find("#answers-container");

		genAnswerDivs($ansContainer);


		this.$el.html(renderedTemp);
		return this;
	},

	listenToInput: function ($inputField) {
		$inputField.on("keyup keydown", function (event) {

		})
	},

	stopListeningEl: function ($el) {
		$el.off();
	},

	genAnswerDivs: function ($container) {
		var $answerDiv = $("<div>");
		var $hidAnsText = $("<div>");
		$answerDiv.addClass("answer-div");
		$hidAnsText.hide();

		var questions = _.keys(quesToAns);
		_.each(questions, function (question) {
			var correctAns = _.first(quesToAns[question]);
			var $newAnswerDiv = $answerDiv.clone();
			var $newHidAnsText = $hidAnsText.clone();

			$newHidAnsText.text(correctAns);
			$newAnswerDiv.append($newHidAnsText);
			$container.append($newAnswerDiv);

			ansDivs[correctAns] = $newAnswerDiv;
		});
	},

	isAnswer: function (posAnswers, trimmedInput) {
		return _.contains(posAnswers, trimmedInput);
	},

	var revealAns: function (correctAns) {
		var $ansDiv = ansDivs[correctAns];
		var $ansTextDiv = $($ansDiv.find("div"));
		//animate reveal later
		$ansDiv.css("background-color", "yellow");
		$ansTextDiv.show();
	}



});