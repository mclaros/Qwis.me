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

ActiveRecord::Schema.define(:version => 20131105033608) do

  create_table "goal_answers", :force => true do |t|
    t.integer  "quiz_id",                      :null => false
    t.string   "correct_answer", :limit => 30, :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  create_table "quiz_prompts", :force => true do |t|
    t.integer  "quiz_id",                      :null => false
    t.string   "correct_answer", :limit => 30, :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "quiz_prompts", ["quiz_id"], :name => "index_quiz_prompts_on_quiz_id"

  create_table "quiz_trackers", :force => true do |t|
    t.integer  "quiz_id",                          :null => false
    t.integer  "play_count",        :default => 0, :null => false
    t.integer  "unique_play_count", :default => 0, :null => false
    t.integer  "fav_count",         :default => 0, :null => false
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "quiz_trackers", ["quiz_id"], :name => "index_quiz_trackers_on_quiz_id"

  create_table "quizzes", :force => true do |t|
    t.integer  "author_id",                                            :null => false
    t.string   "title",           :limit => 50,                        :null => false
    t.string   "description",     :limit => 150
    t.string   "category",        :limit => 20,                        :null => false
    t.string   "scope",           :limit => 20,  :default => "common", :null => false
    t.string   "prompt",          :limit => 100,                       :null => false
    t.boolean  "reviewed_by_mod",                :default => false
    t.integer  "length",                                               :null => false
    t.integer  "time_limit",                                           :null => false
    t.datetime "created_at",                                           :null => false
    t.datetime "updated_at",                                           :null => false
  end

  create_table "valid_answers", :force => true do |t|
    t.integer  "goal_answer_id",               :null => false
    t.string   "answer",         :limit => 30, :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "valid_answers", ["goal_answer_id"], :name => "index_valid_answers_on_goal_answer_id"

end
