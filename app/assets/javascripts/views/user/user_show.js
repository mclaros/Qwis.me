Qwisme.Views.UserShow = Backbone.View.extend({
	template: JST["user/user_show"],

	render: function () {
		var renderedTemp = this.template({
			user: this.model
		});

		this.$el.html(renderedTemp)
		return this;
	}
});