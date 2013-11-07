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
		console.log(this.model)
		this.quesToAns = this.gameData.ques_to_ans;
		this.ansToQues = this.gameData.ans_to_ques;
		this.remainingAnsrs = this.model.allPosAnswers();
		this.ansDivs = {};

		var that = this;
		var $container = $renderedView.find("#answers-container");
		var $answerDiv = $("<div>");
		var $hidAnsText = $("<div>");
		$answerDiv.addClass("answer-div");
		$hidAnsText.hide();

		//ADDITION
		var prompts = this.model.get("quiz_prompts");
		prompts.each(function (prompt) {
			var correctAns = prompt.get("correct_answer");
			var $newAnswerDiv = $answerDiv.clone();
			var $newHidAnsText = $hidAnsText.clone();

			$newHidAnsText.text(correctAns);
			$newAnswerDiv.append($newHidAnsText);
			$container.append($newAnswerDiv);
			that.ansDivs[correctAns] = $newAnswerDiv;
		});
		//END ADDITION
	
		//BELOW is obsolete
		// var questions = _.keys(this.quesToAns);
		// _.each(questions, function (question) {
		// 	var correctAns = _.first(that.quesToAns[question]);
		// 	var $newAnswerDiv = $answerDiv.clone();
		// 	var $newHidAnsText = $hidAnsText.clone();

		// 	$newHidAnsText.text(correctAns);
		// 	$newAnswerDiv.append($newHidAnsText);
		// 	$container.append($newAnswerDiv);

		// 	that.ansDivs[correctAns] = $newAnswerDiv;
		// });
	},

	isAnswer: function (trimmedInput) {
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