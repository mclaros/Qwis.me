Qwisme.Models.User = Backbone.Model.extend({
	urlRoot: "/users",

	parse: function (data) {
		debugger
		data.favorite_quizzes = new Qwisme.Collections.FavoriteQuizzes(data.favorite_quizzes);
		data.favoritings = new Qwisme.Collections.Favoritings(data.favoritings);
		data.authored_quizzes = new Qwisme.Collections.Quizzes(data.authored_quizzes);
		data.played_quizzes = new Qwisme.Collections.Quizzes(data.played_quizzes);
		return data;
	}
});