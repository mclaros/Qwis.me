Qwisme.Collections.Quizzes = Backbone.Collection.extend({
	url: "/quizzes",
	model: Qwisme.Models.Quiz,
	
	initialize: function (modelData, options) {
		console.log("quizzes collection init");
		if ( !_.isUndefined(options) ) this.page = options.page;
	},

	parse: function (data) {
		console.log("quizzes collection parse");
		if ( !_.isEmpty(data) ) {
			this.page = parseInt(data[0].page) || 1;
			this.total_pages = parseInt(data[0].total_pages);
		}

		return data;
	}
});