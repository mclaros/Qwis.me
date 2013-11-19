Qwisme.Collections.Users = Backbone.Collection.extend({
	url: "/users",

	initialize: function (options) {
		this.fetched = false;
	},

	parse: function (data) {
		_.each(data, function (singleUserData) {
			singleUserData.favorite_quizzes = new Qwisme.Collections.FavoriteQuizzes(singleUserData.favorite_quizzes);
			singleUserData.favoritings = new Qwisme.Collections.Favoritings(singleUserData.favoritings);
			singleUserData.authored_quizzes = new Qwisme.Collections.Quizzes(singleUserData.authored_quizzes);
			singleUserData.played_quizzes = new Qwisme.Collections.Quizzes(singleUserData.played_quizzes);
		});

		if ( !_.isEmpty(data) ) {
			this.page = parseInt(data[0].page) || 1;
			this.total_pages = parseInt(data[0].total_pages);
		}

		return data;
	},

	setFetchCheckTimer: function () {
		this.fetched = true;
		this.fetchCheckTimer = setTimeout(this.resetFetchCheck.bind(this), 180000);
	},

	resetFetchCheck: function () {
		this.fetched = false;
		this.fetchCheckTimer && clearTimeout(this.fetchCheckTimer);
	}
})