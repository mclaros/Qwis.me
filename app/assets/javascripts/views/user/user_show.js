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
		
		return this;
	},

	initHistoryView: function () {
		event.preventDefault();
		var that = this;

		if ( _.isUndefined(this.historyView) ) {
			this.historyView = new Qwisme.Views.QuizIndex({
				collection: that.model.get("played_quizzes")
			});
			this.historyView.render();
			this.historyView.$el.find(".page-header").hide();
			this.$el.find("#history-section").html(this.historyView.$el);
		}
	},

	showQPointModal: function (event) {
		event.preventDefault();
		$("#q-point-modal").modal();
	}
});