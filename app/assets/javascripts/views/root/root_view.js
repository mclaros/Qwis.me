Qwisme.Views.RootView = Backbone.View.extend({
	template: JST["root/root_view"],

	render: function () {
		var renderedTemp = this.template();

		this.$el.html(renderedTemp);
		return this;
	}
});