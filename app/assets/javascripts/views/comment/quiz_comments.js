Qwisme.Views.QuizComments = Backbone.View.extend({
	template: JST["comment/quiz_comments"],

	events: {
		"click #add-comment": "submitComment"
	},


	initialize: function () {
		this.listenTo(this.collection, "sync create add", this.render.bind(this))
	},


	render: function () {
		var that = this;

		var renderedTemp = this.template({
			comments: this.collection
		});

		this.$el.html(renderedTemp);
		this.generateCommentsList();
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
			body: trimmedComment,
			quiz_id: that.collection.quizID
		});
	},


	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	},

	generateCommentsList: function () {
		var that = this;
		
		this.collection.each(function (comment) {
			console.log("iterating comment")
			
			if ( _.isNull(comment.get("parent_comment_id")) ) {
				var commentView = new Qwisme.Views.SingleComment({
					model: comment,
					collection: that.collection
				});
				commentView.render();
				that.$el.find("#temp-comments-list2").append(commentView.$el);
			}
		});
	}

});