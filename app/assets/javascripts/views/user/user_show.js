Qwisme.Views.UserShow = Backbone.View.extend({
	template: JST["user/user_show"],

	events: {
		"click #q-point-explain": "showQPointModal"
	},

	render: function (user) {
		var renderedTemp = this.template({
			user: this.model
		});

		this.$el.html(renderedTemp)
		this.$el.find("#quiz-tabs a").click(function (e) {
			e.preventDefault();
			$(this).tab("show");
		});

		this.initHistoryView();
		this.initFavsView();
		this.initAuthoredQuizzesView();
		
		return this;
	},

	initHistoryView: function () {
		if ( _.isUndefined(this.historyView) ) {
			this.historyView = new Qwisme.Views.QuizIndex({
				collection: this.model.get("played_quizzes")
			});
			this.historyView.render();
			this.historyView.$el.find(".page-header").hide();
			this.$el.find("#history-section").html(this.historyView.$el);
		}
	},

	initFavsView: function () {
		if ( _.isUndefined(this.favsView) ) {
			this.favsView = new Qwisme.Views.QuizIndex({
				collection: this.model.get("favorite_quizzes")
			});
			this.favsView.render();
			this.favsView.$el.find(".page-header").hide();
			this.$el.find("#favs-section").html(this.favsView.$el);
		}
	},

	initAuthoredQuizzesView: function () {
		if ( _.isUndefined(this.authoredQuizzesView) ) {
			this.authoredQuizzesView = new Qwisme.Views.QuizIndex({
				collection: this.model.get("authored_quizzes")
			});
			this.authoredQuizzesView.render();
			this.authoredQuizzesView.$el.find(".page-header").hide();
			this.$el.find("#authored-quizzes-section").html(this.authoredQuizzesView.$el);
		}
	},

	showQPointModal: function (event) {
		event.preventDefault();
		$("#q-point-modal").modal();
	}
});