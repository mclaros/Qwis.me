Qwisme.Routers.QuizRouter = Backbone.Router.extend({
	routes: {
		"": "renderQuizIndex",
		"quizzes": "renderQuizIndex",
		"quizzes/:id/play": "renderQuizPlay",
		"quizzes/:id": "renderQuizShow"
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	renderQuizIndex: function () {
		var quizIndex = new Qwisme.Views.QuizIndex({
				collection: Qwisme.QUIZZES
			});

		this._swapView(quizIndex);
	},

	renderQuizShow: function (id) {
		var quiz = Qwisme.QUIZZES.get(id);
		var quizShow = new Qwisme.Views.QuizShow({
			model: quiz
		});

		this._swapView(quizShow);
	},

	renderQuizPlay: function (id) {
		var quiz = Qwisme.QUIZZES.get(id);
		var quizPlay = new Qwisme.Views.QuizPlay({
			model: quiz
		});

		this._swapView(quizPlay);
	},

	_swapView: function (newView) {
		if (!(_.isUndefined(this._currentView))) {
			if (!(_.isUndefined(this._currentView.timer))) {
				clearInterval(this._currentView.timer);	
			} 
			this._currentView.remove();
		}

		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}

});