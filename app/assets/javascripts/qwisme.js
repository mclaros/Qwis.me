window.Qwisme = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    Qwisme.QUIZZES = new Qwisme.Collections.Quizzes(options.quizData, {
      parse:true
    });
    Qwisme.USERS = new Qwisme.Collections.Users();
    Qwisme.CURRENT_USER = new Qwisme.Models.User(options.currentUserData, { parse: true });

    new Qwisme.Routers.QuizRouter({
    	$rootEl: options.$rootEl
    });

    Backbone.history.start();
  }
};
