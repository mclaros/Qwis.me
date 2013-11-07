window.Qwisme = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, quizData) {
    Qwisme.QUIZZES = new Qwisme.Collections.Quizzes(quizData, { parse: true });
    new Qwisme.Routers.QuizRouter({
    	$rootEl: $rootEl
    });

    Backbone.history.start();
  }
};
