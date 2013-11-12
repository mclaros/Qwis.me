Qwisme.Views.SingleComment = Backbone.View.extend({
	template: JST["comment/single_comment"],

	events: {
		"click .expand-reply": "toggleReplyBox",
		"submit form": "submitReply"
	},

	render: function () {
		var renderedTemp = this.template({
			comment: this.model
		});

		this.$el.html(renderedTemp);

		return this;
	},

	submitReply: function (event) {
		event.preventDefault();
	},

	toggleReplyBox: function (event) {
		event.preventDefault();
		$("#reply-box-" + this.model.id).slideToggle();
	}
});