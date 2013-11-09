Qwisme.Views.UserIndex = Backbone.View.extend({
	template: JST["user/user_index"],

	render: function () {
		var renderedTemp = this.template({
			users: this.collection
		});

		this.$el.html(renderedTemp);
		return this;
	}
});