Qwisme.Collections.Comments = Backbone.Collection.extend({
	model: Qwisme.Models.Comment,

	initialize: function (options) {
		this.quizID = options.quizID;
	},

	url: function () {
		return "/quizzes/" + this.quizID + "/comments";
	}
})