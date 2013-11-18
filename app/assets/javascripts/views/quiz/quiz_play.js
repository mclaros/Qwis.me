Qwisme.Views.QuizPlay = Backbone.View.extend({
	template: JST["quiz/quiz_play"],

	events: {
		"click #start-game": "bindStartButton",
		"click #reset-game": "render",
		"click #quit-game": "quitGame"
	},

	render: function () {
		window.quizTimer && clearInterval(window.quizTimer);

		var that = this;
		var renderedTemp = this.template({
			quiz: that.model
		});

		this.$el.html(renderedTemp);
		this.genAnswerDivs();

		return this;
	},

	getGameData: function () {
		this.gameData = this.model.get("game_data");
		this.promptIdToAns = this.gameData.prompt_id_to_ans;
		this.ansToPromptId = this.gameData.ans_to_prompt_id;
		this.remainingAnsrs = this.model.allPosAnswers();
	},

	genSimpleAnsDiv: function (options) {
		var correctAns = options.correctAns;
		var $container = options.$container;
		var $newAnsDiv = this.$el.find("#simple-ans-proto").clone();

		$newAnsDiv.attr("id", "");
		$container.append($newAnsDiv);
		this.ansDivs[correctAns.toLowerCase()] = $newAnsDiv;
	},

	genAnsWithHeaderDiv: function (options) {
		var correctAns = options.correctAns;
		var ansHeader = options.ansHeader;
		var $container = options.$container;
		var $newAnsWithHeaderDiv = this.$el.find("#ans-with-header-proto").clone();

		$newAnsWithHeaderDiv.attr("id", "");
		$newAnsWithHeaderDiv.find(".ans-header").text(ansHeader);
		$container.append($newAnsWithHeaderDiv);
		this.ansDivs[correctAns.toLowerCase()] = $newAnsWithHeaderDiv;
	},

	genAnsWithImgDiv: function (options) {
		var $newAnsWithImgDiv = this.$el.find("#ans-with-img-proto").clone();
		$newAnsWithImgDiv.attr("id", "");
	},

	genAnswerDivs: function () {
		this.getGameData();
		this.ansDivs = {};

		var that = this;
		var prompts = this.model.get("quiz_prompts");

		prompts.each(function (prompt) {
			var correctAns = prompt.escape("correct_answer");
			var ansHeader = prompt.get("prompt");
			if (ansHeader === "") {
				that.genSimpleAnsDiv({
					correctAns: correctAns,
					$container: that.$el.find("#answers-container")
				});
			}
			else {
				that.genAnsWithHeaderDiv({
					correctAns: correctAns,
					ansHeader: ansHeader,
					$container: that.$el.find("#answers-container-titled")
				});
			}
		});
	},

	launchQuiz: function () {
		var $ansContainer = this.$el.find("#answers-container");
		$("#quit-game").attr("disabled", false);
		this.listenToInput();
		this.runTimer();
	},

	listenToInput: function () {
		var that = this;
		var $inputField = this.$el.find("#player-input");

		$inputField.on("keyup keydown", function (event) {
			var inputStr = $inputField.val();
			inputStr = $.trim(inputStr);
			inputStr = inputStr.toLowerCase();

			if (that.isAnswer(inputStr)) {
				$inputField.val("");
				that.trackCorrectGuess(inputStr);

				var $counterDiv = that.$el.find("#correct-count");
				var newCount = 1 + parseInt($counterDiv.text());
				$counterDiv.text(newCount);
			}
		});
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


	isAnswer: function (trimmedInput) {
		var lowerCasedAnsrs = _.map(this.remainingAnsrs, function (remainAns) {
			return remainAns.toLowerCase();
		});
		return _.contains(lowerCasedAnsrs, trimmedInput);
	},

	revealAns: function (correctAns) {
		var $ansDiv = this.ansDivs[correctAns.toLowerCase()];
		var $ansTextDiv = $($ansDiv.find(".ans-text"));
		//animate reveal later
		$ansDiv.css("background-color", "#ffe047");
		$ansTextDiv.text(correctAns);
	},

	revealAllAns: function () {
		var that = this;
		_.each(that.ansDivs, function (val, key) {
			that.revealAns(key);
		});
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

	bindStartButton: function (event) {
		event.preventDefault();
		var $button = $(event.target);
		var $inputField = this.$el.find("#player-input")
		
		this.launchQuiz(this.$el);
		$inputField.attr("disabled", false);
		$inputField.focus();
		$button.attr("disabled", true);
		$button.addClass("active");
		$button.off();
	},

	quitGame: function () {
		$("#player-input").attr("disabled", true);
		$("#quit-game").attr("disabled", true);
		$("#reset-game").attr("disabled", false);
		this.revealAllAns();

		clearInterval(window.quizTimer);
	},

	winActions: function () {
		console.log("YOU WIN!");
		var $input = $("#player-input");
		
		$input.attr("disabled", true);
		this.stopListeningEl($input);
		window.quizTimer && clearInterval(window.quizTimer);
		$("#reset-game").attr("disabled", false);
		$("#quit-game").attr("disabled", true);

		this.submitPlayRecord({win: true});

		$("#notice").html("<img src='" + this.getWinPic() + "' style='max-height: 400px; max-width: 400px;'>");
		$("#notice").append($("<p>Congratulations, you win!</p>"));
		$("#noticeModal").modal();
	},

	loseActions: function () {
		$("#player-input").attr("disabled", true);
		$("#quit-game").attr("disabled", true);
		$("#reset-game").attr("disabled", false);
		this.revealAllAns();
		this.submitPlayRecord({win: false});
	},

	submitPlayRecord: function (options) {
		var playerResult = options.win;
		var that = this
		$.ajax({
			url: "/play_histories",
			type: "POST",
			data: {
				play_history: {
					quiz_id: this.model.id,
					finished: playerResult,
					finish_time: (that.model.get("time_limit")*60) - that.timeLeft
				}
			},
			
			success: function (data) {
				that.onSubmitPlayRecord();
			},

			error: function (data) {
				console.log("ERROR IN SUBMITTING PLAY RECORD");
				$("#notice").text("Error on play record submission");
				$("#noticeModal").modal();
			}
		})
	},

	onSubmitPlayRecord: function () {
		//since we can't because of modal on win
		$("#quiz-play-count").text( this.model.get("play_count") + 1 )

		this.model.set({
			play_count: this.model.get("play_count") + 1
		});
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