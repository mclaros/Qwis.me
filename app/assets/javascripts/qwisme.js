window.Qwisme = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, quizData, userData) {
    Qwisme.QUIZZES = new Qwisme.Collections.Quizzes(quizData, { parse: true });
    Qwisme.USERS = new Qwisme.Collections.Users();
    Qwisme.USERS.add(userData);

    new Qwisme.Routers.QuizRouter({
    	$rootEl: $rootEl
    });

    Backbone.history.start();
  }
};
