Qwisme.Views.QuizNew = Backbone.View.extend({
	template: JST["quiz/quiz_new"],

	events: {
		"click #submit-quiz-form": "submitForm",
		"click .new-prompt-field": "dupPromptDiv",
		"click .opt-field-blank": "readOnlyToField",
	},

	render: function () {
		var that = this;
		var scopes = ["common", "amateur", "expert"];
		var categories = ["entertainment", "gaming", "geography", "history", "holiday", "just For Fun", "language", "literature", "movies", "music", "odd Qwirks (Misc.)", "religion", "science", "sports", "television"];

		var renderedTemp = this.template({
			categories: categories,
			scopes: scopes
		});

		this.$el.html(renderedTemp);

		return this;
	},

	submitForm: function (event) {
		event.preventDefault();
		var formData = $("#quiz-form").serialize();

		$.ajax({
			url: "/quizzes",
			type: "POST",
			data: formData,
			success: function (resNewId) {
				var newID = parseInt(resNewId);
				Qwisme.QUIZZES.fetch({
					success: function () {
						Backbone.history.navigate(("/quizzes/" + newID), {
							trigger: true
						})
					}
				})
			},

			error: function (res) {
				console.log(res);
				$("#form-errors").text(res.responseText);
			}
		})
	},

	resetPromptDiv: function ($div) {
		var that = this;

		$div.find("div").each(function (idx, el) {
			var $blankDiv = $("<div>");
			$blankDiv.addClass("opt-field-blank");
			$blankDiv.text("Add valid answer...");

			$(el).replaceWith($blankDiv);
			// that.readOnlyToFieldListen($blankDiv);
		});

		$div.find("input").each(function (idx, el) {
			var $el = $(el);
			var isTarget = ($el.attr("class") === "opt-field-active" || $el.attr("class") === "opt-field-filled");
			if (isTarget) {
				$blankDiv = $("<div>");
				$blankDiv.addClass("opt-field-blank");
				$blankDiv.text("Add valid answer...");
				
				$(el).replaceWith($blankDiv);
				// that.readOnlyToFieldListen($blankDiv);
			}
		});
	},


	addToQuizLength: function (addend) {
		var oldCount = parseInt($("#quiz-length").val());
		var newCount = oldCount + addend;
		$("#quiz-length").val(newCount);
		$("#length-counter").text(newCount);
	},

	dupPromptDiv: function (event) {
		event.preventDefault();

		var $lastDiv = $(".prompt-fields").last();
		var pAnswerText = $.trim($lastDiv.find(".prompt-answer").val());

		if (!(pAnswerText.length >=3 && pAnswerText.length <= 30)) {
			$lastDiv.after("Invalid question or answer ")
			return;
		}

		var $newDiv = $lastDiv.clone();
		$newDiv.find("input").val("");
		$newDiv.css("display", "none");
		
		//set all inner divs, no-class text fields to .opt-field-blank
		this.resetPromptDiv($newDiv);
		$lastDiv.after($newDiv);
		$newDiv.slideToggle("fast", function () {
			$("body").scrollTo({top:'+=350px', left: '0'}, 400);
		});

		this.addToQuizLength(1);
		
	},

	readOnlyToField: function(event) {
		event.preventDefault();

		var $origEl = $(event.target);
		var $fieldInput = $("<input>");
		
		$fieldInput.attr({
			type: "text",
			class: "opt-field-active",
			name: "quiz_prompts[][valid_answers][][valid_answer]"
		});

		//Assume if .val() returns empty string, it is DIV
		if ($origEl.val() === "") {
			var text = $origEl.text();
			text = (text === "Add valid answer" ? "" : text);
			$fieldInput.val(text);
		}
		else {
			$fieldInput.val($origEl.val());
		}

		$origEl.replaceWith($fieldInput);
		$fieldInput.focus();
		this.fieldToReadOnlyListen($fieldInput);
	},


	fieldToReadOnlyListen: function ($field) {
		var that = this;

		$field.on("blur keypress", function (event) {
			//ENTER or TAB
			var validTrigger = (event.type === "blur" || (event.which === 13 || event.which === 9)); 

			if (validTrigger) {
				var field = event.target;
				var valText = $(field).val();
				//trim whitespace
				valText = $.trim(valText);
				var valEmpty = (valText === "");
				var $readOnlyText;

				if (valEmpty) {
					$readOnlyText = $("<div>");
					$readOnlyText.addClass("opt-field-blank");
					$readOnlyText.text("Add valid answer");
				}
				else {
					$readOnlyText = $("<input>");
					$readOnlyText.attr({
						class: "opt-field-filled",
						name: "quiz_prompts[][valid_answers][][valid_answer]",
						readonly: true,
						value: valText
					});
				}

				$(field).replaceWith($readOnlyText);
				// that.readOnlyToFieldListen($readOnlyText);
			}
		});
	}

});