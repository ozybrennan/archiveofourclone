module Api
  class FandomsController < ApplicationController

    def index
      @fandoms = Fandom.all
      render :index
    end

    def show
      @fandom = Fandom.find(params["id"])
      render :show
    end

  end
end
