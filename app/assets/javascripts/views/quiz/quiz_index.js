Qwisme.Views.QuizIndex = Backbone.View.extend({
	template: JST["quiz/quiz_index"],

	render: function () {		
		var renderedTemp = this.template({
			quizzes: this.collection
		});

		this.$el.html(renderedTemp);
		$(window).scroll( _.throttle(this.scrollFetch, 1000).bind(this) ) ;
		return this;
	},

	scrollFetch: function () {
		var that = this;
		var scrollRemaining = $(document).height() - $(window).scrollTop() - $(window).height();
		if ( scrollRemaining < 50 && (this.collection.page < this.collection.total_pages) ) {
			this.collection.fetch({
				remove: false,
				data: { page: that.collection.page + 1 },
				success: function () {
					that.render();
				}
			});
		}
	}
});