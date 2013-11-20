#[Qwis.me](http://www.qwis.me/)

> A _[Sporcle](www.sporcle.com)_ clone to test your _Qwisdom_.

__Quick Summary:__ 

Qwis.me is a trivia quiz creation and play website, inspired by [Sporcle](http://www.sporcle.com). Qwis.me diverges from Sporcle in tha its front-end (apart from the login/signup page) consists entirely of one static page with a dynamic Backbone interface. As such, it behaves more like a webapp, and performs all server queries through AJAX.
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
  * Quiz stats: number of plays, favorites, etc.
  * Comments
 * Users
  * Authentication/authorization
  * Allows log in as guest account
  * Profile page
    * Uploadable avatar image
    * Quiz History ("Qwistory")
    * Favorite Quizzes
    * Authored Quizzes
    * stats: number of games played, favorites, authored quiz popularity, etc.
    * "Qwismaster Points": arbitrary point system calculated using other user statistics (such as number of other users who have played or favorited your authored quizzes)
  * Quiz History ("Qwistory")
  * Favorite Quizzes
  * User statistics: # of plays,
 * Quiz index pages
  * Displays quiz stats
  * Displays "First played on `DATE`" if applicable

###Additional features (not cloned)

  * Backbone frontend, dynamic
  * Ruby on Rails backend
  * All server queries, apart from authentication, performed through AJAX
  * Pagination, with "infinite scrolling"
  * Recursively nested comments
   * Expandable replies list and reply field
  * Dynamic quiz-creation form with live preview, simple client-side validations
  * Minimalistic interface via Twitter Bootstrap 3


###Proposed features, not implemented

  * Allow uploaded images as answer prompts
  * Allow users to follow other users, send "challenges" (attempt to beat quiz-completion time of opponent)
  * Track quiz top-records, such as _fastest completion time_
  * Multiplayer
  * Administrator users who can moderate, alter quizzes
  * Editing, destruction of quizzes (by moderator or author)
  * Tracking of individual answers
    * average hit-rate (% of users who manage to guess a particular answer)
    * line or bar chart for answer statistics via [Chart.js](http://www.chartjs.org/)
