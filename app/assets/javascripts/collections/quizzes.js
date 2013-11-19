Qwisme.Collections.Quizzes = Backbone.Collection.extend({
	url: "/quizzes",
	model: Qwisme.Models.Quiz,
	
	initialize: function (modelData, options) {
		if (options) this.page = options.page;
	},

	parse: function (data) {
		this.page = data.page;
		this.total_pages = data.total_pages;
		delete data.page;
		delete data.total_pages;
		return data;
	}
});