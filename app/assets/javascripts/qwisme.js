window.Qwisme = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    Qwisme.QUIZZES = new Qwisme.Collections.Quizzes(options.quizData, { parse: true });
    Qwisme.USERS = new Qwisme.Collections.Users();
    Qwisme.CURRENT_USER = Qwisme.USERS.add(options.currentUserData);

    new Qwisme.Routers.QuizRouter({
    	$rootEl: options.$rootEl
    });

    Backbone.history.start();
  }
};
