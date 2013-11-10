# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131110062220) do

  create_table "comments", :force => true do |t|
    t.integer  "author_id"
    t.integer  "parent_comment_id"
    t.string   "body",              :limit => 200, :null => false
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
    t.integer  "quiz_id",                          :null => false
  end

  add_index "comments", ["author_id"], :name => "index_comments_on_author_id"
  add_index "comments", ["parent_comment_id"], :name => "index_comments_on_parent_comment_id"

  create_table "favoritings", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.string   "quiz_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "favoritings", ["user_id", "quiz_id"], :name => "index_favoritings_on_user_id_and_quiz_id", :unique => true

  create_table "play_histories", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "quiz_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "play_histories", ["user_id", "quiz_id"], :name => "index_play_histories_on_user_id_and_quiz_id"

  create_table "quiz_prompts", :force => true do |t|
    t.integer  "quiz_id",                      :null => false
    t.string   "correct_answer", :limit => 30, :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "prompt",         :limit => 30
  end

  add_index "quiz_prompts", ["quiz_id"], :name => "index_quiz_prompts_on_quiz_id"

  create_table "quiz_trackers", :force => true do |t|
    t.integer  "quiz_id",                   :null => false
    t.integer  "play_count", :default => 0, :null => false
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "quiz_trackers", ["quiz_id"], :name => "index_quiz_trackers_on_quiz_id"

  create_table "quizzes", :force => true do |t|
    t.integer  "author_id"
    t.string   "title",       :limit => 50,                        :null => false
    t.string   "description", :limit => 150
    t.string   "category",    :limit => 20,                        :null => false
    t.string   "scope",       :limit => 20,  :default => "common", :null => false
    t.integer  "length",                                           :null => false
    t.integer  "time_limit",                                       :null => false
    t.datetime "created_at",                                       :null => false
    t.datetime "updated_at",                                       :null => false
    t.string   "question",    :limit => 100,                       :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                :default => "", :null => false
    t.string   "encrypted_password",                   :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                           :null => false
    t.datetime "updated_at",                                           :null => false
    t.string   "username",               :limit => 15,                 :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

  create_table "valid_answers", :force => true do |t|
    t.integer  "quiz_prompt_id",               :null => false
    t.string   "valid_answer",   :limit => 30, :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "valid_answers", ["quiz_prompt_id"], :name => "index_valid_answers_on_quiz_prompt_id"

  create_table "views", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "views", ["email"], :name => "index_views_on_email", :unique => true
  add_index "views", ["reset_password_token"], :name => "index_views_on_reset_password_token", :unique => true

end
