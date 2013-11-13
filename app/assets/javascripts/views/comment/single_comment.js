Qwisme.Views.SingleComment = Backbone.View.extend({
	template: JST["comment/single_comment"],

	events: {
		"click .expand-reply": "toggleReplyBox",
		"submit form": "submitReply"
	},

	initialize: function () {
		this.listenTo(this.model, "sync change", this.render.bind(this));
	},

	render: function () {
		console.log("rendering view for comment " + this.model.id);
		var renderedTemp = this.template({
			comment: this.model
		});
		this.$el.html(renderedTemp);
		this.generateReplyViews();

		return this;
	},

	submitReply: function (event) {
		event.preventDefault();
		var $form = $(event.target);
		var replyBody = $.trim($form.find("textarea").val());
		
		if (replyBody.length === 0) {
			$form.find("textarea").val("");
			this.showNoticeModal("Reply can't be blank");
			return;
		}

		var that = this;
		var parentId = $form.data("parent-id");

		console.log(parentId);
		console.log(replyBody);

		var newReply = new Qwisme.Models.Comment({
			parent_comment_id: parentId,
			body: replyBody
		});
		newReply.save({}, {
			success: function () {
				$form.find("textarea").val("")
				$("#reply-list-" + that.model.id).append("<li>success</li>");
			}
		});
	},

	toggleReplyBox: function (event) {
		event.preventDefault();
		$("#reply-box-" + this.model.id).slideToggle();
	},

	generateReplyViews: function () {
		// this.model.get("replies")
		// $("#reply-list-" + this.model.id).append("<li>success</li>");
	},

	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	},
});