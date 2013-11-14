Qwisme.Models.User = Backbone.Model.extend({
	urlRoot: "/users",

	parse: function (data) {
		data.favorite_quizzes = new Qwisme.Collections.FavoriteQuizzes(data.favorite_quizzes);
		data.favoritings = new Qwisme.Collections.Favoritings(data.favoritings);
		return data;
	}
});