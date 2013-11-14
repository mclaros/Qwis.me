Qwisme.Collections.Users = Backbone.Collection.extend({
	url: "/users",

	parse: function (data) {
		_.each(data, function (singleUserData) {
			singleUserData.favorite_quizzes = new Qwisme.Collections.FavoriteQuizzes(singleUserData.favorite_quizzes);
			singleUserData.favoritings = new Qwisme.Collections.Favoritings(singleUserData.favoritings);
			singleUserData.authored_quizzes = new Qwisme.Collections.Quizzes(singleUserData.authored_quizzes);
			singleUserData.played_quizzes = new Qwisme.Collections.Quizzes(singleUserData.played_quizzes);
		});

		return data;
	}
})