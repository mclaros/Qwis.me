Qwisme.Views.QuizComments = Backbone.View.extend({
	template: JST["comment/quiz_comments"],

	events: {
		"click #add-comment": "submitComment"
	},


	initialize: function () {
		this.listenTo(this.collection, "sync", this.render)
	},


	render: function () {
		var that = this;
		var renderedTemp = this.template({
			comments: that.collection
		});

		this.$el.html(renderedTemp);

		this.commentTimer = setTimeout(this.generateCommentsList.bind(this), 50);

		return this;
	},


	submitComment: function (event) {
		event.preventDefault();
		var that = this;
		var trimmedComment = $.trim($("#new-comment-field").val());
		$("#new-comment-field").val(trimmedComment);

		if (trimmedComment.length === 0) {
			this.showNoticeModal("Comment can't be blank");
			return;
		}

		this.collection.create({
			body: trimmedComment
		});
		// var formData = $("#new-comment-form").serialize();
	},


	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	},

	generateCommentsList: function () {
		this.collection.each(function (comment) {
			var commentView = new Qwisme.Views.SingleComment({
				model: comment
			})
			$("#temp-comments-list2").append(commentView.render().$el);
		});
		clearTimeout(this.commentTimer);
	}
});