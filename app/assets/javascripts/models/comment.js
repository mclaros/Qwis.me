Qwisme.Models.Comment = Backbone.Model.extend({
	urlRoot: function () {
		return "/quizzes/" + this.get("quiz_id") + "/comments";
	},

	parse: function (data) {
		data.comments = new Qwisme.Collections.Comments(
			data.comments, {
				quizID: data.id,
				parse: true
			});

		return data;
	},

	parse: function (data) {
		data.comments = new Qwisme.Collections.Comments(data.comments, {
			quizID: this.quizID,
			parse: true
		});
		
		return data;
	}
});