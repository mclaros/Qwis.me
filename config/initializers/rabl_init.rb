require 'rabl'

Rabl.configure do |config|
  config.include_json_root = false
  config.include_child_root = false
  config.escape_all_output = false

  #ONLY FOR TESTING
  config.raise_on_missing_attribute = false
end