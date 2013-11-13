Qwisme.Views.QuizPlay = Backbone.View.extend({
	template: JST["quiz/quiz_play"],

	events: {
		"click #start-game": "bindStartButton",
		"click #reset-game": "render"
	},

	render: function () {
		window.quizTimer && clearInterval(window.quizTimer);

		var that = this;
		var renderedTemp = this.template({
			quiz: that.model,
			prompts: that.model.get("quiz_prompts")
		});

		this.$el.html(renderedTemp);
		this.genAnswerDivs(this.$el);
		this.showFilledAnswerContainers();

		return this;
	},

	launchQuiz: function (renderedView) {
		var $ansContainer = renderedView.find("#answers-container");
		this.listenToInput(renderedView);
		this.runTimer();
	},

	listenToInput: function (renderedView) {
		var that = this;
		var $inputField = renderedView.find("#player-input");

		$inputField.on("keyup keydown", function (event) {
			var inputStr = $inputField.val();
			inputStr = $.trim(inputStr);

			if (that.isAnswer(inputStr)) {
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
		var guessQuestion = this.ansToPromptId[guess];
		var validAnswers = this.promptIdToAns[guessQuestion];
		var correctAns = _.first(validAnswers);

		this.revealAns(correctAns);
		this.remainingAnsrs = _.difference(this.remainingAnsrs, validAnswers);

		if (this.remainingAnsrs.length === 0) {
			this.winActions();
		}
	},

	genAnswerDivs: function ($renderedView) {
		this.gameData = this.model.get("game_data");
		this.promptIdToAns = this.gameData.prompt_id_to_ans;
		this.ansToPromptId = this.gameData.ans_to_prompt_id;
		this.remainingAnsrs = this.model.allPosAnswers();
		this.ansDivs = {};

		var that = this;
		var $container = $renderedView.find("#answers-container");
		var $answerDiv = $("<div>");
		var $hidAnsText = $("<div>");
		$answerDiv.addClass("answer-div");
		$hidAnsText.hide();

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
	},

	showFilledAnswerContainers: function () {
		
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
	},

	runTimer: function (startTimeSecs) {
		this.timeLeft = (startTimeSecs || this.model.get("time_limit")*60);
		window.quizTimer = setInterval(this.updateTimer.bind(this), 1000);
	},

	updateTimer: function () {
		this.timeLeft -= 1;
		var that = this;
		var mins = Math.floor(this.timeLeft/60);
		
		var secs = this.timeLeft % 60;
		if (secs < 10) secs = "0" + secs;
		$("#minutes").text(mins);
		$("#seconds").text(secs);

		if (this.timeLeft <= 0) {
			clearInterval(window.quizTimer);
			that.timeOut();
		}
	},

	timeOut: function () {
		console.log("TIME UP");
		this.loseActions();
	},

	revealAllAns: function () {
		$(".answer-div").each(function (idx, answerDiv) {
			$(this).find("div").css("background-color", "yellow");
			$(this).find("div").show();
		});
	},

	bindStartButton: function (event) {
		event.preventDefault();
		var $button = $(event.target);
		var $inputField = this.$el.find("#player-input")
		
		this.launchQuiz(this.$el);
		$inputField.attr("disabled", false);
		$inputField.focus();
		$button.attr("disabled", true);
		$button.off();
	},

	winActions: function () {
		console.log("YOU WIN!");
		var $input = $("#player-input");
		
		$input.attr("disabled", true);
		this.stopListeningEl($input);
		window.quizTimer && clearInterval(window.quizTimer);
		$("#reset-game").attr("disabled", false);

		$("#notice").html("<img src='" + this.getWinPic() + "' style='max-height: 400px; max-width: 400px;'>");
		$("#notice").append($("<p>Congratulations, you win!</p>"));
		$("#noticeModal").modal();
	},

	loseActions: function () {
		$("#player-input").attr("disabled", true);
		$("#reset-game").attr("disabled", false);
		this.revealAllAns();
	},

	getWinPic: function () {
		var randomnumber = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
		var imgs = ["https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-1.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-2.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-3.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-4.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-5.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-6.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-7.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-8.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-9.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-10.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-11.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-12.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-14.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-16.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-17.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-18.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-19.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-20.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-21.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-22.jpg",
				"https://s3-us-west-1.amazonaws.com/qwisme-development/thumbs-up-23.jpg"];

		return imgs[randomnumber];
	}

});