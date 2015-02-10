require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ArchiveOfOurClone
  class Application < Rails::Application
    config.filepicker_rails.api_key = "A796H8SahRq6Qn54R3cxWz"
  end
end
