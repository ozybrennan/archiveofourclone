class SessionsController < ApplicationController

  before_action :require_current_user!, only: :destroy

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user.is_a?(User)
      log_in!(@user)
      redirect_to root_path
    else
      errors = @user
      @user = User.new(user_params)
      flash[:errors] = errors
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to root_path
  end

end
