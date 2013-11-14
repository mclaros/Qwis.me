Qwisme.Views.UserShow = Backbone.View.extend({
	template: JST["user/user_show"],

	render: function (user) {
		var renderedTemp = this.template({
			user: this.model
		});

		this.$el.html(renderedTemp)
		this.$el.find("#quiz-tabs a").click(function (e) {
			e.preventDefault();
			$(this).tab("show");
		});
		
		return this;
	}
});