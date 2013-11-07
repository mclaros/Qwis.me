Qwisme.Views.QuizPlay = Backbone.View.extend({
	template: JST["quiz/quiz_play"],

	render: function () {
		var that = this;
		var renderedTemp = this.template({
			quiz: this.model,
			prompts: this.model.get("quiz_prompts")
		});

		genAnswerDivs(renderedTemp);

		renderedTemp.find("#start-game").on("click", function {
			event.preventDefault();
			var $button = $(event.target);

			that.launchQuiz(renderedTemp);
			renderedTemp.find("#player-input").attr("disabled", false);
			$button.attr("disabled", true);
			$button.off();
		})

		this.$el.html(renderedTemp);
		return this;
	},

	launchQuiz: function (renderedView) {
		this.gameData = this.model.get("game_data");
		this.quesToAns = gameData.ques_to_ans;
		this.ansToQues = gameData.ans_to_ques;
		this.remainingAnsrs = this.model.posAnswers();

		var $ansContainer = renderedView.find("#answers-container");

		listenToInput(renderedView);
	},

	listenToInput: function (renderedView) {
		var $inputField = renderedView.find("#player-input");

		$inputField.on("keyup keydown", function (event) {
			var inputStr = $inputField.val();
			inputStr = $.trim(inputStr);

			if (isAnswer(inputStr)) {
				$inputField.val("");
				trackCorrectGuess(inputStr);

				val $counterDiv = renderedView.find("#correct-count");
				var newCount = 1 + parseInt($counterDiv.text());
				$counterDiv.text(newCount);
			}
		})
	},

	stopListeningEl: function ($el) {
		$el.off();
	},

	trackCorrectGuess: function (guess) {
		var guessQuestion = this.ansToQues[guess];
		var validAnswers = this.quesToAns[guessQuestion];
		var correctAns = _.first(validAnswers);

		revealAns(correctAns);
		this.remainingAnsrs = _.difference(this.remainingAnsrs, validAnswers);
	},

	genAnswerDivs: function ($renderedView) {
		this.ansDivs = {};

		var that = this;
		var $container = $renderedView
		var $answerDiv = $("<div>");
		var $hidAnsText = $("<div>");
		$answerDiv.addClass("answer-div");
		$hidAnsText.hide();

		var questions = _.keys(this.quesToAns);
		_.each(questions, function (question) {
			var correctAns = _.first(that.quesToAns[question]);
			var $newAnswerDiv = $answerDiv.clone();
			var $newHidAnsText = $hidAnsText.clone();

			$newHidAnsText.text(correctAns);
			$newAnswerDiv.append($newHidAnsText);
			$container.append($newAnswerDiv);

			that.ansDivs[correctAns] = $newAnswerDiv;
		});
	},

	isAnswer: function (trimmedInput) {
		return _.contains(this.remainingAnsrs, trimmedInput);
	},

	var revealAns: function (correctAns) {
		var $ansDiv = this.ansDivs[correctAns];
		var $ansTextDiv = $($ansDiv.find("div"));
		//animate reveal later
		$ansDiv.css("background-color", "yellow");
		$ansTextDiv.show();
	}



});