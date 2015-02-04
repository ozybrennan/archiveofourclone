module Api

  class StoriesController < ApplicationController

    before_action :require_current_user!, except: [:index, :show]

    def index
      @stories = Story.all
      render json: @stories
    end

    def show
      @story = Story.find(params["id"])
      render json: @story
    end

  end

end
