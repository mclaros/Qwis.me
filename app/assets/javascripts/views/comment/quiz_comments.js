Qwisme.Views.QuizComments = Backbone.View.extend({
	template: JST["comment/quiz_comments"],

	events: {
		"click #add-comment": "submitComment"
	},


	render: function () {
		var that = this;
		var renderedTemp = this.template({
			comments: that.collection
		});

		this.$el.html(renderedTemp);
		return this;
	},


	submitComment: function (event) {
		event.preventDefault();
		var that = this;
		var trimmedComment = $.trim($("#new-comment-field").val());
		$("#new-comment-field").val(trimmedComment);

		if (trimmedComment.length === 0) {
			return;
		}

		var formData = $("#new-comment-form").serialize();
		$.ajax({
			url: "quizzes/" + that.model.id + "/comments",
			data: formData,
			type: "POST",
			
			success: function (response) {
				console.log(response)
				that.render();
			},

			error: function (response) {
				console.log(response)
			}
		});
	},


	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	}
});