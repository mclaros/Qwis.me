Qwisme.Views.QuizShow = Backbone.View.extend({
	template: JST["quiz/quiz_show"],

	events: {
		"click #comments-tab-link": "initCommentsView"
	},

	render: function () {
		var that = this;
		var renderedTemp = this.template({
			quiz: that.model,
			prompts: that.model.get("quiz_prompts")
		});

		this.$el.html(renderedTemp);
		this.$el.find("#quiz-tabs a").click(function (e) {
			e.preventDefault();
			$(this).tab("show");
		})

		this.playViewTimer = setTimeout(this.renderPlayView.bind(this), 50);

		return this;
	},

	renderPlayView: function () {
		this.quizPlay = new Qwisme.Views.QuizPlay({
			model: this.model
		});
		this.quizPlay.render();
		this.$el.find("#play-section").html(this.quizPlay.$el);
		clearTimeout(this.playViewTimer);
	},

	renderCommentsView: function (commentsCollection) {
		var that = this;
		this.commentsView = new Qwisme.Views.QuizComments({
			model: that.model,
			collection: commentsCollection
		});
		this.commentsView.render();
		this.$el.find("#comments-section").html(this.commentsView.$el);	
	},

	initCommentsView: function (event) {
		event.preventDefault();
		var that = this;
		
		if ( _.isUndefined(this.commentsView) ) {
			var comments = this.model.get("comments");
			comments.fetch({
				success: function () {
					that.renderCommentsView(comments);
				}
			});
		}
	}

});