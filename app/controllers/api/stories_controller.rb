module Api

  class StoriesController < ApplicationController

    before_action :require_current_user!, except: [:index, :show, :update]

    def index
      @stories = Kaminari.paginate_array(Story.find_by_tags(params[:tags])).page(params[:page])
      @page = params[:page]
      render :index
    end

    def show
      @story = Story.find(params["id"])
      render :show
    end

    def create
      @story = current_user.stories.new
      story_attributes = @story.process_attributes(story_params)
      story_attributes[:user_id] = current_user.id
      if @story.update(story_attributes)
        render :show
      else
        render json: @story.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @story = Story.find(params[:id])
      story_attributes = @story.process_attributes(story_params)
      if @story.update_attributes(story_attributes)
        render :show
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
        params.require(:story).permit(:text, :summary, :title, :notes, :kudos_count,
          :hits, :fandom, :warnings, :ratings, :categories, :characters, :relationships,
          :additional)
      end

  end

end
