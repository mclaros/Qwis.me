Qwisme.Views.QuizShow = Backbone.View.extend({
	template: JST["quiz/quiz_show"],

	events: {

	},

	render: function () {
		var that = this;
		var renderedTemp = this.template({
			quiz: that.model,
			prompts: that.model.get("quiz_prompts")
		});

		this.$el.html(renderedTemp);
		this.renderPlayView();
		this.renderCommentsView();

		return this;
	},

	renderPlayView: function () {
		this.quizPlay = new Qwisme.Views.QuizPlay({
			model: this.model
		});
		this.quizPlay.render();
		this.$el.find("#play-section").html(this.quizPlay.$el);
	},

	renderCommentsView: function () {
		var that = this;
		$.ajax({
			url: "/quizzes/" + that.model.id + "/comments",
			type: "GET",
			success: function (commentData) {
				that.quizComments = new Qwisme.Views.QuizComments({
					model: that.model,
					commentData: commentData
				});
				that.quizComments.render();

				that.$el.find("#comments-section").html(that.quizComments.$el);
			}
		});	
	}
});