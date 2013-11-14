Qwisme.Views.QuizShow = Backbone.View.extend({
	template: JST["quiz/quiz_show"],

	events: {
		"click #comments-tab-link": "initCommentsView",
		"click #fav-btn": "toggleFav"
	},

	render: function () {
		var that = this;
		var renderedTemp = this.template({
			quiz: that.model,
			prompts: that.model.get("quiz_prompts")
		});

		this.$el.html(renderedTemp);
		this.$el.find("#quiz-tabs a").click(function (e) {
			e.preventDefault();
			$(this).tab("show");
		})

		this.playViewTimer = setTimeout(this.renderPlayView.bind(this), 50);

		return this;
	},

	renderPlayView: function () {
		this.quizPlay = new Qwisme.Views.QuizPlay({
			model: this.model
		});
		this.quizPlay.render();
		this.$el.find("#play-section").html(this.quizPlay.$el);
		clearTimeout(this.playViewTimer);
	},

	renderCommentsView: function (commentsCollection) {
		var that = this;
		this.commentsView = new Qwisme.Views.QuizComments({
			model: that.model,
			collection: commentsCollection
		});
		this.commentsView.render();
		this.$el.find("#comments-section").html(this.commentsView.$el);	
	},

	initCommentsView: function (event) {
		event.preventDefault();
		var that = this;
		
		if ( _.isUndefined(this.commentsView) ) {
			var comments = this.model.get("comments");
			comments.fetch({
				success: function () {
					that.renderCommentsView(comments);
				}
			});
		}
	},

	toggleFav: function (event) {
		event.preventDefault();
		var that = this;
		var currentUser = Qwisme.CURRENT_USER;

		if (this.model.get("has_favorited")) {
			var favoriting = currentUser.get("favoritings").findWhere({quiz_id: that.model.id });
			favoriting.destroy({
				success: function () {
					that.model.set({
						has_favorited: false,
						fav_count: that.model.get("fav_count") - 1
					})
					var currUserFavedQuiz = currentUser.get("favorite_quizzes").get(that.model.id);
					currentUser.get("favorite_quizzes").remove(currUserFavedQuiz);
					that.render();
				}
			})
		}
		else {
			currentUser.get("favoritings").create({
				quiz_id: that.model.id
			}, {
				success: function () {
					that.model.set({
						has_favorited: true,
						fav_count: that.model.get("fav_count") + 1
					});
					currentUser.get("favorite_quizzes").add(that.model.attributes);
					that.render();
				}
			})
		}
	}

});