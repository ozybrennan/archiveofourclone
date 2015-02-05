module Api

  class StoriesController < ApplicationController

    before_action :require_current_user!, except: [:index, :show]

    def index
      @stories = Story.all
      render :index
    end

    def show
      @story = Story.find(params["id"])
      render :show
    end

    def create
      @story = current_user.stories.new(story_params)
      if @story.save
        render json: @story
      else
        render json: @story.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @story = current_user.stories.find(params[:id])
      if @story.update_attributes(story_params)
        render json: @story
      else
        render json: @story.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @story = current_user.stories.find(params[:id])
      @story.try(:destroy)
      render json: {}
    end

    private

      def story_params
        params.require(:board).permit(:text, :summary, :title, :notes)
      end

  end

end
