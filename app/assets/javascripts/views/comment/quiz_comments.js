Qwisme.Views.QuizComments = Backbone.View.extend({
	template: JST["comment/quiz_comments"],

	events: {
		"click #add-comment": "submitComment"
	},

	initialize: function (options) {
		this.commentData = options.commentData
	},

	render: function () {
		var that = this;
		console.log(this.commentData)
		var renderedTemp = this.template({
			commentData: that.commentData
		});

		this.$el.html(renderedTemp);
		return this;
	},

	submitComment: function (event) {
		event.preventDefault();
		var that = this;

		$.ajax({
			url: "quizzes/" + that.model.id + "/comments",
			
			type: "POST",
			
			success: function (response) {
				that.showNoticeModal(response);
			},

			error: function (resposne) {
				that.showNoticeModal(resposne);
			}
		});
	},

	showNoticeModal: function (notice) {
		$("#notice").text(notice);
		$("#noticeModal").modal();
	}
});