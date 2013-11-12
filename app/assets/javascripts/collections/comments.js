Qwisme.Collections.Comments = Backbone.Collection.extend({
	model: Qwisme.Models.Comment,

	initialize: function (models, options) {
		console.log(options)
		this.quizID = options.quizID;
	},

	url: function () {
		return "/quizzes/" + this.quizID + "/comments";
	}
})