#[Qwis.me](http://www.qwis.me/)

> A _[Sporcle](www.sporcle.com)_ clone to test your _Qwisdom_.

####Table of Contents

1. [Quick Summary](#quick-summary)
2. [Sporcle](#sporcle)
3. [Clone: Qwis.me](#clone-qwisme-domain-acquired)
  1. [Cloned features](#cloned-features)
  2. [Additional features](#additional-features-not-cloned)
  3. [Proposed features](#proposed-features-not-implemented)
4. [Known Issues](#known-issues)
5. [Architecture](#architecture)
6. [Other Technologies Used](#other-technologies-used)
7. [Screenshots](#screenshots)

####Quick Summary:

[Qwis.me](http://www.qwis.me/) is a trivia quiz creation and play website, inspired by [Sporcle](http://www.sporcle.com). Qwis.me diverges from Sporcle in tha its front-end (apart from the login/signup page) consists entirely of one static page with a dynamic Backbone interface. As such, it behaves more like a webapp, and performs all server queries through AJAX.
Qwis.me's frontend rests on a Ruby-on-Rails backend.

Additional features include: pagination (infinite scrolling), dynamic quiz-creation form with live-preview, favorites, nested comments, quiz/user history and statistics.

##[Sporcle](http://www.sporcle.com)

###Sporcle: Description

Sporcle lets users create quizzes (trivia) which can be played by other users (or guests) on the site. Quizzes are typically timed, and require the user to “fill-in the blanks.” 
For example, a prompt may be: "Words that rhyme with cat," followed by a text input box. 

Acceptable answers (as defined by quiz author) are instantaneously accepted and revealed; no pressing of ENTER or SUBMIT required. Textbox clears itself only on correct answers.
Ex.: [Can you name the one syllable words that rhyme with the word cat?](http://www.sporcle.com/games/gwukelic/meow)

Users can also upload images for more visual guessing games.
Ex.: [Can you name the famous celebrity and character faces but badly drawn in Photoshop?](http://www.sporcle.com/games/lt2009/badlydrawn)

###Sporcle: Quiz creation
     
Only users may create quizzes, but guests can play them. Quizzes are moderated, and may be published to top lists/front page. Users can rate quizzes, comment on them, favorite them, share them, and challenge other users on a quiz (multiplayer).

Quizzes must have title, description, category, timing assigned. Number of answers to guess (quiz length) and acceptable spellings of each answer must be provided. 

For example, in a game of Name all fast food franchises, author may allow: McDonald’s, mcdonalds, Mc Donalds, etc -- as one answer.

_Optional:_ tags, data source (credit for info used), images, answer/hint headings (ex.: name; in years), gameplay options (ex.: enforce answer order, allow incorrect answers).


##Clone: “Qwis.me” (domain acquired)

[http://www.qwis.me/](http://www.qwis.me/)

###Cloned features

 * Quizzes
  * Text-only match quiz creation (basic Sporcle quiz format)
    * Allows abritrary number prompts to answer, as well as acceptable and alternate answers
    * Allows optional answer headers (ex. "In years", "Name of famous musician")
  * Timed quiz-play, with events on win/loss
  * Completed plays (user guesses all or time runs out) are recorded onto a PlayHistory
  * Quiz stats: number of plays, favorites, etc. (mainly through queries on a single model/table)
  * Comments
 * Users
  * Authentication/authorization
  * Allows log in as guest account
  * Profile page
    * Uploadable avatar image
    * Quiz History ("Qwistory")
    * Favorite Quizzes
    * Authored Quizzes
    * User stats: number of games played, favorites, authored quiz popularity, etc. (mainly through quieries on a single model/table)
    * "Qwismaster Points": arbitrary point system calculated using other user statistics (such as number of other users who have played or favorited your authored quizzes)
 * Quiz index pages
  * Displays quiz stats
  * Displays "First played on `DATE`" if applicable

###Additional features (not cloned)

  * Backbone frontend, dynamic
  * Ruby on Rails backend
  * All server queries, apart from authentication, performed through AJAX
  * Pagination, with infinite scrolling
  * Recursively nested comments
   * Expandable replies list and reply field
  * Dynamic quiz-creation form with live preview, simple client-side validations
  * Minimalistic interface via Twitter Bootstrap 3


###Proposed features, not implemented

  * Cache frequent SQL queries (using Redis, perhaps?)
  * Add quiz indices per category/type of quiz
  * Allow uploaded image for quiz
  * Allow uploaded images as answer prompts, instead of text
  * Allow users to follow other users, send "challenges" (attempt to beat quiz-completion time of opponent)
  * Track quiz top-records, such as _fastest completion time_; award _Qwismaster points_ for setting new records 
  * Multiplayer, through websockets
  * Administrator users who can moderate, alter quizzes
  * Editing, destruction of quizzes, users (by moderator or author)
  * Tracking of individual answers
    * through an AnswerTracker model, `attr_accessible :quiz_id, :quiz_prompt_id, :guessed`(boolean)
    * average hit-rate (% of users who manage to guess a particular answer)
    * line or bar chart for answer statistics via [Chart.js](http://www.chartjs.org/)
  * Polish the design

##Known Issues

Because _all_ quiz data is no longer bootstrapped, users will receive a "Quiz does not exist" error if they attempt to refresh the page of a quiz not normally found within the first "page" of a quiz index fetch (currently five quizzes per page fetch). This is remedied by going to the `Quiz Index` and navigating to the individual quiz page from there. A simple solution would be to fetch individual quiz data on demand, is it hasn't lready been fetched/bootstrapped, however this require an extra query.

Quiz creation form's live preview has a bug where it will not render `answer` preview boxes correctly if one particular `answer` does not have a `header` _and_ is followed by an `answer` that does have one. This bug is specific to the live preview and does not affect published quizzes. Bug stems from how [jQuery.SerializeJSON](https://github.com/marioizquierdo/jquery.serializeJSON) operates on forms that allow arrays of optional (blank) values.

The "First played on `DATE`" tag does not update on quiz indices until the user refreshes the page. This is something to change at a later date.

Users can "mine" _Qwismaster points_ by playing quizzes repeatedly. This includes their own authored quizzes. This is something to change at a later date.

##Architecture

###Backend: Ruby-on-Rails

![Qwis.me Models](https://raw.github.com/mclaros/Qwis.me/master/qwisme_models.png "Qwis.me Models")

Efforts were made to minimize the amount of SQL queries made. For example, using ActiveRecord `includes` when sending models' assocations' data via JSON; or reducing the number of `Backbone.Collection.fetch()`es for non-crucial data (no sooner than every 3 minutes for UsersIndex collection on user visit to that route; fetch quiz commets only if users opens that section).

App static page contains bootstrapped `current_user` and first page of `quizzes` data.

Almost all quiz and user statistics are gathered from a single PlayHistory model/table through the use of several custom queries. For example:

  * User play count: `USER.play_histories.count`
  * User unique (distinct quizzes) play count: `PlayHistory.select("COUNT(quiz_id)").where(:user_id => USER.id).group(:quiz_id).length`

###Frontend: Backbone.js

  * [Models](https://github.com/mclaros/Qwis.me/tree/master/app/assets/javascripts/models)
   * Quiz
   * QuizPrompt
   * ValidAnswer
   * User
   * Comment
   * Favoriting
   * PlayHistory
  * [Collections](https://github.com/mclaros/Qwis.me/tree/master/app/assets/javascripts/collections)
   * Quizzes
   * QuizPrompts
   * ValidAnswers
   * Users
   * Comments
   * Favoritigs
   * PlayHistories
  * [Views](https://github.com/mclaros/Qwis.me/tree/master/app/assets/javascripts/views) (and [Templates](https://github.com/mclaros/Qwis.me/tree/master/app/assets/templates))
   * Quiz: Index, Show, Play, New, FormPreview
   * User: Index, Show
   * Comment: QuizComments, SingleComment
  * [QuizRouter](https://github.com/mclaros/Qwis.me/blob/master/app/assets/javascripts/routers/quiz_router.js)

  `Backbone.Model/Collection.parse()` was used extensively to process custom attributes, child association data delivered by server-side RABL templates

##Other Technologies Used

  * Ruby gems
   * [RABL](https://github.com/nesquena/rabl) by [Nathan Esquenazi](https://github.com/nesquena) (JSON templating)
   * [Kaminari](https://github.com/amatsuda/kaminari) by [Akira Matsuda](https://github.com/amatsuda) (pagination)
   * [Figaro](https://github.com/laserlemon/figaro) by [Steve Richert](https://github.com/laserlemon)
   * [Paperclip](https://github.com/thoughtbot/paperclip/) by [thoughtbot, inc.](https://github.com/thoughtbot)
   * [Devise](https://github.com/plataformatec/devise) by [Plataformatec](https://github.com/plataformatec)
  * JS libraries
   * [Underscore.js](http://underscorejs.org/)
   * [Underscore.string](http://epeli.github.io/underscore.string/) by [Esa-Matti Suuronen](https://github.com/epeli)
   * [jQuery](http://jquery.com/)
   * [jQuery.SerializeJSON](https://github.com/marioizquierdo/jquery.serializeJSON) by [Mario Izquierdo](https://github.com/marioizquierdo)
   * [jQuery.ScrollTo](https://github.com/flesler/jquery.scrollTo) by [Ariel Flesler](https://github.com/flesler)
   * [jQuery.Sticky](http://stickyjs.com/) by [Anthony Garand](https://github.com/garand)
   * [Pace.js](http://github.hubspot.com/pace/docs/welcome/) by [HubSpot](https://github.com/HubSpot)

##Screenshots
