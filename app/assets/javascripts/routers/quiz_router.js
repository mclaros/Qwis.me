Qwisme.Routers.QuizRouter = Backbone.Router.extend({
	routes: {
		"": "renderRoot",
		"users": "renderUserIndex",
		"users/:id": "renderUserShow",
		"quizzes": "renderQuizIndex",
		"quizzes/new": "renderQuizNew",
		"quizzes/:id/play": "renderQuizPlay",
		"quizzes/:id": "renderQuizShow"
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	renderRoot: function () {
		var rootView = new Qwisme.Views.RootView();

		this._swapView(rootView);
	},

	renderUserIndex: function () {
		var that = this;
		//TEMPORARY
		Qwisme.USERS = Qwisme.USERS || new Qwisme.Collections.Users();
		//END TEMP

		Qwisme.USERS.fetch({
			success: function () {
				var userIndex = new Qwisme.Views.UserIndex({
					collection: Qwisme.USERS
				});

			that._swapView(userIndex);
			}
		})

	},

	renderUserShow: function (id) {
		var that = this;
		//save current user as global?
		var user = Qwisme.USERS.get(id);

		if (_.isUndefined(user)) {
			$.ajax({
				url: "/users" + id,
				type: "GET",
				success: function (userData) {
					user = Qwisme.USERS.create(userData);
				},

				error: function (data) {
					console.log("USER DOES NOT EXIST?!");
				}
			});
		}

		var userShow = new Qwisme.Views.UserShow({
			model: user
		});
		that._swapView(userShow);
	},

	renderQuizIndex: function () {
		var quizIndex = new Qwisme.Views.QuizIndex({
				collection: Qwisme.QUIZZES
			});

		this._swapView(quizIndex);
	},

	renderQuizNew: function () {
		var quizNew = new Qwisme.Views.QuizNew();

		this._swapView(quizNew);
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
			this._currentView.$el.remove(); //in case of zombie events
			this._currentView.remove();
		}

		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}

});