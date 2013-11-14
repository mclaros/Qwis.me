Qwisme.Routers.QuizRouter = Backbone.Router.extend({
	routes: {
		"": "renderRoot",
		"users": "renderUserIndex",
		"users/:id": "renderUserShow",
		"quizzes": "renderQuizIndex",
		"quizzes/new": "renderQuizNew",
		"quizzes/:id/play": "renderQuizPlay",
		"quizzes/:id": "renderQuizShow",
		"excomment": "renderExampleComment"
	},

	renderExampleComment: function () {
		var template = JST["comment/nested_comments"];
		this.$rootEl.html(template());
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
			parse: true,

			success: function () {
				var userIndex = new Qwisme.Views.UserIndex({
					collection: Qwisme.USERS
				});

			that._swapView(userIndex);
			}
		});
	},

	renderUserShow: function (id) {
		var that = this;
		//save current user as global?

		Qwisme.USERS.fetch({
			success: function () {
				var user = Qwisme.USERS.get(id);

				if ( _.isUndefined(user) ) {
					that.showNoticeModal("User does not exist!");
					return;
				}

				var userShow = new Qwisme.Views.UserShow({
						model: user
					});
					
				that._swapView(userShow);
			}
		});
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

		if (_.isUndefined(quiz)) {
			this.showNoticeModal("Quiz does not exist!");
			return;
		}

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
		if ( !(_.isUndefined(this._currentView)) ) {
			this._currentView.$el.remove(); //in case of zombie events
			this._currentView.remove();
		}

		this._currentView = newView;
		this._currentView.render().$el.hide();
		this.$rootEl.html(newView.$el);
		this._currentView.$el.fadeIn()
;	},

	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	}

});