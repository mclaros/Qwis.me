Qwisme.Models.Comment = Backbone.Model.extend({
	urlRoot: function () {
		return "/quizzes/" + this.get("quiz_id") + "/comments";
	}
});