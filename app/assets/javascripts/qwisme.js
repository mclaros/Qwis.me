window.Qwisme = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var quizData = $("#bootstrapped_quizzes").html();
    Qwisme.QUIZZES = new Qwisme.Collections.Quizzes(quizData);

    new Qwisme.Routers.QuizRouter({
    	$rootEl: $("#root-main-div")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
	Qwisme.initialize();
});
