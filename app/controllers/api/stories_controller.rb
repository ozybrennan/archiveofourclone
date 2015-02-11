module Api

  class StoriesController < ApplicationController

    before_action :require_current_user!, except: [:index, :show, :update]

    def index
      if params[:tags] && params[:tags] != ""
        stories = Story.find_by_tags(params[:tags])
        @total_works = stories.length
        @stories = Kaminari.paginate_array(stories).page(params[:page])
      else
        stories = Story.all
        @total_works = stories.length
        @stories = stories.page(params[:page])
      end
      @page = params[:page]

      render :index
    end

    def new
    end

    def show
      @story = Story.find(params["id"])
      render :show
    end

    def create
      story_params[:text].each do |text|
        if text != ""
          @story_text = text
        end
      end

      @story = Story.create({text: @story_text, title: story_params[:title]})
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
        params.require(:story).permit(:summary, :title, :notes, :kudos_count,
          :hits, :fandom, text: [], warnings: [], characters: [], relationships: [],
          additional: [], ratings: [], categories: [])
      end

  end

end
