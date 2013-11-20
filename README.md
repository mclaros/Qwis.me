#[Qwis.me](http://www.qwis.me/)

> A _[Sporcle](www.sporcle.com)_ clone to test your _Qwisdom_.

__Quick Summary:__ Qwis.me is a trivia quiz creation and play website, inspired by [Sporcle](http://www.sporcle.com). Qwis.me diverges from Sporcle in that its front-end (apart from the login/signup page) consists entirely of one static page with a dynamic Backbone interface. As such, it behaves more like a webapp, and performs all server queries through AJAX. Additional features include: pagination (infinite scrolling), dynamic quiz-creation form with live-preview, favorites, nested comments, quiz/user history and statistics. 

##Sporcle

###Sporcle: Description

Sporcle lets users create quizzes (trivia) which can be played by other users (or guests) on the site. Quizzes are typically timed, and require the user to “fill-in the blanks.” 

For example, a prompt may be: "Words that rhyme with cat," followed by a text input box. 

Acceptable answers (as defined by quiz author) are instantaneously accepted and revealed; no pressing of ENTER or SUBMIT required. Textbox clears itself only on correct answers.
     Ex.: [Can you name the one syllable words that rhyme with the word cat?](http://www.sporcle.com/games/gwukelic/meow)

Users can also upload images for more visual guessing games.
     Ex.: [Can you name the famous celebrity and character faces but badly drawn in Photoshop?](http://www.sporcle.com/games/lt2009/badlydrawn)

###Sporcle: Quiz creation
     
Only users may create quizzes. Quizzes are moderated, and may be published to top lists/front page. Users can rate quizzes, comment on them, favorite them, share them, and challenge other users on a quiz (multiplayer).

Quizzes must have title, description, category, timing assigned. Number of answers to guess (quiz length) and acceptable spellings of each answer must be provided. 

For example, in a game of Name all fast food franchises, author may allow: McDonald’s, mcdonalds, MacDonalds, Mc Donalds, etc -- as one answer.

Optional: tags, data source (credit for info used), images, answer/hint headings (ex.: name; in years), gameplay options (ex.: enforce answer order, allow incorrect answers).


##Clone: “Qwis.me” (domain acquired)

[http://www.qwis.me/](http://www.qwis.me/)

###Cloned features

 * Quizzes
  * Text-only match quiz creation (basic Sporcle quiz format)
    * Allows abritrary number prompts to answer, as well as acceptable and alternate answers
  * Timed quiz-play, with events on win/loss
  * Completed plays (user guesses all or time runs out) are recorded onto a PlayHistory
  * Quiz stats: number of plays, favorites, etc.
  * Comments
    * Recursive nested comments, unlimited nesting
    * Expandable "Reply" box and replies list (sub-comments)
 * Users
  * Authentication/authorization
  * Allows log in as guest account
  * Profile page
    * Quiz History ("Qwistory")
    * Favorite Quizzes
    * Authored Quizzes
    * stats: # games played, favorites, authored quizzes, etc
  * Quiz History ("Qwistory")
  * Favorite Quizzes
  * User statistics: # of plays,
 * Quiz index pages
  * Displays quiz stats
  * Displays "First played on `DATE`" if applicable

###Additional features (not cloned)

  * Backbone front-end, dynamic
  * All server queries, apart from authentication, performed through AJAX
  * Pagination, with "infinite scrolling"
  * Dyamic quiz-creation form with live preview, simple client-side validations