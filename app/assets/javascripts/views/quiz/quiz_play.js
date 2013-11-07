Qwisme.Views.QuizPlay = Backbone.View.extend({
	template: JST["quiz/quiz_play"],

	render: function () {
		var that = this;

		var renderedTemp = this.template({
			quiz: that.model,
			prompts: that.model.get("quiz_prompts")
		});

		this.$el.html(renderedTemp);


		this.genAnswerDivs(this.$el);

		var $startButton = $(this.$el.find("#start-game"));
		$startButton.on("click", function (event) {
			event.preventDefault();
			var $button = $(event.target);
			var $inputField = that.$el.find("#player-input")
			console.log("launching")
			
			that.launchQuiz(that.$el);
			$inputField.attr("disabled", false);
			$inputField.focus();
			$button.attr("disabled", true);
			$button.off();
		});

		return this;
	},

	launchQuiz: function (renderedView) {
		console.log("launched")
		var $ansContainer = renderedView.find("#answers-container");
		this.listenToInput(renderedView);
	},

	listenToInput: function (renderedView) {
		var that = this;
		var $inputField = renderedView.find("#player-input");

		$inputField.on("keyup keydown", function (event) {
			var inputStr = $inputField.val();
			inputStr = $.trim(inputStr);

			if (that.isAnswer(inputStr)) {
				console.log("is answer!");
				$inputField.val("");
				that.trackCorrectGuess(inputStr);

				var $counterDiv = renderedView.find("#correct-count");
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

		this.revealAns(correctAns);
		this.remainingAnsrs = _.difference(this.remainingAnsrs, validAnswers);
	},

	genAnswerDivs: function ($renderedView) {
		this.gameData = this.model.get("game_data");
		this.quesToAns = this.gameData.ques_to_ans;
		this.ansToQues = this.gameData.ans_to_ques;
		this.remainingAnsrs = this.model.allPosAnswers();
		this.ansDivs = {};

		var that = this;
		var $container = $renderedView
		var $answerDiv = $("<div>");
		var $hidAnsText = $("<div>");
		$answerDiv.addClass("answer-div");
		$hidAnsText.hide();

		console.log(this.quesToAns);
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
		console.log(this.remainingAnsrs);
		console.log(_.contains(this.remainingAnsrs, trimmedInput));
		return _.contains(this.remainingAnsrs, trimmedInput);
	},

	revealAns: function (correctAns) {
		var $ansDiv = this.ansDivs[correctAns];
		var $ansTextDiv = $($ansDiv.find("div"));
		//animate reveal later
		$ansDiv.css("background-color", "yellow");
		$ansTextDiv.show();
	}



});