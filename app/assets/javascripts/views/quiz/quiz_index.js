Qwisme.Views.QuizIndex = Backbone.View.extend({
	template: JST["quiz/quiz_index"],

	render: function () {		
		var renderedTemp = this.template({
			quizzes: this.collection
		});

		this.$el.html(renderedTemp);
		return this;
	}
});