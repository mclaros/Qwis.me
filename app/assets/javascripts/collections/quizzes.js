Qwisme.Collections.Quizzes = Backbone.Collection.extend({
	url: "/quizzes",
	model: Qwisme.Models.Quiz,
	
	initialize: function (modelData, options) {
		if (options) this.page = options.page;
	},

	parse: function (data) {
		console.log("parse data for quizzes is");
		console.log(data);
		if (data[0].page) this.page = parseInt(data[0].page);
		if (data[0].total_pages) this.total_pages = parseInt(data[0].total_pages);
		return data;
	}
});