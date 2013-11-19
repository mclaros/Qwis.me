Qwisme.Views.QuizIndex = Backbone.View.extend({
	template: JST["quiz/quiz_index"],

	render: function () {		
		// debugger
		var renderedTemp = this.template({
			quizzes: this.collection
		});

		this.$el.html(renderedTemp);
		return this;
	},

	
});