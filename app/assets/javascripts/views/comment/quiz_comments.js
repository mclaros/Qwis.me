Qwisme.Views.QuizComments = Backbone.View.extend({
	template: JST["comment/quiz_comments"],

	render: function () {
		var renderedTemp = this.template();

		this.$el.html(renderedTemp);
		return this;
	}
});