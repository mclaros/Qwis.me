// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.scrollTo.min
//= require underscore
//= require underscore.string.min
//= require backbone

//= require jquery.serializeJSON.min
//= require jquery.sticky
//= require qwisme
//= require pace.min

//= require bootstrap

//= require_tree ../templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .


window.ssScroller = function (options) {
	var startX = options.startX;
	var startY = options.startY;
	var deltaX = options.deltaX;
	var deltaY = options.deltaY;
	var duration = options.duration;
	var endCallback = options.endCallback || function () {};
	var $container = options.$container;
	var stepSpeed = options.stepSpeed || 20;
	var $captionContainer = options.$captionContainer;
	var caption = options.caption || "";

	$container.css("background-position", "" + startX + "px " + startY + "px");
	$captionContainer.html(caption);
	var currX = startX;
	var currY = startY;
	var timeLeft = duration;

	window.scrollInterval = setInterval(function () {
		currX = currX - deltaX;
		currY = currY - deltaY;
		timeLeft -= stepSpeed;
		$container.css("background-position", "" + currX + "px " + currY + "px");

		if (timeLeft <= 0) {
			endCallback();
			clearInterval(window.scrollInterval);
		}
	} , stepSpeed);
};

window.ssTransition = function (options) {
	var duration = options.duration;
	var defaultColor = options.defaultColor || "rgba(255, 250, 228, 0.6)";
	var defaultOpacity = options.defaultOpacity || 0.6;
	var flashOpacity = options.flashOpacity || 1;
	var $container = options.$container;
	var flashCallback = options.flashCallback || function () {};

	var stepSpeed = 20;
	var flashBrightening = true;
	var flashStepTime = duration / stepSpeed;
	var opacityStepSize = Math.abs(flashOpacity - defaultOpacity) / flashStepTime;
	var currOpacity = defaultOpacity;

	var flashInterval = setInterval(function () {
		if (currOpacity >= flashOpacity) {
			flashBrightening = false;
			flashCallback();
		}
		currOpacity = currOpacity + (flashBrightening ? opacityStepSize : -opacityStepSize);
		$container.css("background-color", "rgba(255, 250, 228, " + currOpacity + ")");
		if (!flashBrightening && currOpacity <=  defaultOpacity) {
			$container.css("background-color", "rgba(255, 250, 228, " + defaultOpacity + ")");
			clearInterval(flashInterval);
		}
	}, stepSpeed);

};



$(document).ready(function () {
	if ( !_.isEmpty($("#ss-jumbotron")) ) {
		window.ss1ScollerData = {
			startX: -10,
			startY: 0,
			deltaX: 0,
			deltaY: 2,
			duration: 3000,
			$container: $("#ss-jumbotron"),
			$captionContainer: $("#jumbotron-caption"),
			caption: "Create quizzes<br><small>Dynamic quiz form with live preview</small>"
		};

		window.ss2ScollerData = {
			startX: -250,
			startY: -710,
			deltaX: -1,
			deltaY: 4,
			duration: 3000,
			$container: $("#ss-jumbotron"),
			$captionContainer: $("#jumbotron-caption"),
			caption: "Pick your answers<br><small>Supports alternate answers</small>"
		};

		window.ss3ScollerData = {
			startX: -1230,
			startY: 0,
			deltaX: 0,
			deltaY: 4,
			duration: 3000,
			$container: $("#ss-jumbotron"),
			$captionContainer: $("#jumbotron-caption"),
			caption: "Play quizzes!<br><small>Try and beat the timer</small>"
		};

		window.ss4ScollerData = {
			startX: -1230,
			startY: -900,
			deltaX: 1.5,
			deltaY: 4.5,
			duration: 3000,
			$container: $("#ss-jumbotron"),
			$captionContainer: $("#jumbotron-caption"),
			caption: "Track<br><small>your history, favorites, scores, and created quizzes</small>"
		};

		window.transition = function () {
			window.ssTransition({
				duration: 200,
				$container: $("#ss-shader"),
				flashCallback: function () {console.log("flash!")}
			});
		};

		window.scrollCycleArr = [ss1ScollerData, ss2ScollerData, ss3ScollerData, ss4ScollerData];
		window.currCycleIdx = 0;

		window.nextCycle = function () {
			var currCycleData = window.scrollCycleArr[window.currCycleIdx];
			currCycleData.endCallback = window.nextCycle;

			window.ssTransition({
				duration: 200,
				$container: $("#ss-shader"),
				flashCallback: function () {
					window.ssScroller(currCycleData);
				}
			})

			window.currCycleIdx = (window.currCycleIdx + 1) % window.scrollCycleArr.length
		};

		window.nextCycle();
	}
});