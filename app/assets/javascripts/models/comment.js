Qwisme.Models.Comment = Backbone.Model.extend({
	urlRoot: function () {
		return "/quizzes/" + this.get("quiz_id") + "/comments";
	},

	parse: function (data) {
		data.comments = new Qwisme.Collections.Comments(data.comments, {
			quizID: this.get("quiz_id"),
			parse: true
		});
		
		return data;
	}
});