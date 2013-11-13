Qwisme.Views.SingleComment = Backbone.View.extend({
	template: JST["comment/single_comment"],

	events: {
		"submit form": "submitReply"
	},

	initialize: function () {
		this.listenTo(this.collection, "sync add", this.render.bind(this))
	},

	render: function () {
		var renderedTemp = this.template({
			comment: this.model
		});
		this.$el.html(renderedTemp);
		this.$el.find("#expand-reply-" + this.model.id).on("click", this.toggleReplyBox.bind(this));
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

		this.collection.create({
			parent_comment_id: parentId,
			quiz_id: that.collection.quizID,
			body: replyBody
		});
	},

	toggleReplyBox: function (event) {
		event.preventDefault();
		$("#reply-box-" + this.model.id).slideToggle();
	},

	generateReplyViews: function () {
		var that = this;
		var $replyList = this.$el.find("#reply-list-" + this.model.id);
		this.model.get("comments").each(function (reply) {
			var replyView = new Qwisme.Views.SingleComment({
				model: that.collection.get(reply),
				collection: that.collection
			});
			replyView.render();
			$replyList.append(replyView.$el);
		});
	},

	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	},
});