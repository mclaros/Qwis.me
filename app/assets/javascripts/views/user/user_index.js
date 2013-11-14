Qwisme.Views.UserIndex = Backbone.View.extend({
	template: JST["user/user_index"],

	events: {
		"click #q-point-explain": "showQPointModal"
	},

	render: function () {
		var renderedTemp = this.template({
			users: this.collection
		});

		this.$el.html(renderedTemp);
		return this;
	},

	showQPointModal: function (event) {
		event.preventDefault();
		$("#q-point-modal").modal();
	}
});