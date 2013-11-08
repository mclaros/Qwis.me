Qwisme.Models.User = Backbone.Model.extend({
	urlRoot: "/users",

	parse: function (data) {
		return data;
	}
});