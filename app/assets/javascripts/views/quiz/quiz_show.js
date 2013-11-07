Qwisme.Views.QuizShow = Backbone.View.extend({
	template: JST["quiz/quiz_show"],

	render: function () {
		var that = this;
		var renderedTemp = this.template({
			quiz: that.model,
			prompts: that.model.get("quiz_prompts")
		});

		this.$el.html(renderedTemp);
		return this;
	}
});