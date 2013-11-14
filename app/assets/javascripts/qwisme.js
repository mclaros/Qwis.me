window.Qwisme = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    Qwisme.QUIZZES = new Qwisme.Collections.Quizzes(options.quizData, { parse: true });
    Qwisme.USERS = new Qwisme.Collections.Users();
    Qwisme.CURRENT_USER = Qwisme.USERS.add(options.currentUserData);
    this.parseInitUser(Qwisme.CURRENT_USER);

    new Qwisme.Routers.QuizRouter({
    	$rootEl: options.$rootEl
    });

    Backbone.history.start();
  },

  parseInitUser: function (user) {
    user.attributes.favorite_quizzes = new Qwisme.Collections.FavoriteQuizzes(user.get("favorite_quizzes"));
    user.attributes.favoritings = new Qwisme.Collections.Favoritings(user.get("favoritings"));
  }
};
