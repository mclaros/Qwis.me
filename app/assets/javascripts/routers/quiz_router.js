Qwisme.Routers.QuizRouter = Backbone.Router.extend({
	routes: {
		"": "renderQuizIndex",
		"quizzes/:id/play": "renderQuizPlay"
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	renderQuizIndex: function () {
		//avoid fetching later
		var that = this;

		Qwisme.QUIZZES.fetch({
			success: function () {
				var quizIndex = new Qwisme.Views.QuizIndex({
					collection: Qwisme.QUIZZES
				});

				that._swapView(quizIndex);
			}
		})
	},

	renderQuizPlay: function (id) {
		var quiz = Qwisme.QUIZZES.get(id);
		var quizShow = new Qwisme.Views.QuizPlay({
			model: quiz
			});

		this._swapView(quizShow);
	},

	_swapView: function (newView) {
		this._currentView && this._currentView.remove();
		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}

});