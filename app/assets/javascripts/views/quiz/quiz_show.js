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

		var quizPlay = new Qwisme.Views.QuizPlay({
			model: this.model
		});
		quizPlay.render();
		this.$el.find("#play-section").html(quizPlay.$el);

		return this;
	}
});