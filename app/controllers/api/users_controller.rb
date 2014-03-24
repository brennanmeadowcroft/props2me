class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :change_password, :edit, :update, :destroy]
  before_filter :restrict_access, only: [:update, :change_password, :destroy]
  before_filter :correct_user, only: [:change_password]
  before_filter :admin_or_correct_user, only: [:update]
  before_filter :admin_user, only: [:delete]

  def index
    @users = User.all
    respond_to do |format|
      format.json { render json: @users }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @user, serializer: UserDetailSerializer, root: false }
    end
  end

  def create
    # Check to see if the user has already been created
    @user = User.find_by_email(params[:user][:email])

    # If they have, update the existing user with information
    if @user
      @user.update(user_params)
    else # If not, create a new one...
      @user = User.new(user_params)
    end

    respond_to do |format|
      if @user.save
        format.json { render json: @user, status: :created, root: false }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def change_password
    respond_to do |format|
      if @user.authenticate(params[:old_password])
        if @user.update(:password => params[:password], :password_confirmation=>params[:password_confirmation])
          format.json { head :no_content }
        else
          format.json { render json: @user.errors, status: :unauthorized }
        end
      end
    end
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.json { head :no_content }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :position, :active, :admin, :password, :password_confirmation)
    end

    def restrict_access
      api_key = ApiKey.find_by_access_token(params[:access_token])
      @current_user = api_key.user
      head :unauthorized unless api_key
    end

    def correct_user
      user = User.find(params[:id])
      current_user = ApiKey.find_by_access_token(params[:access_token]).user
      head :unauthorized unless current_user.id == user.id
    end

    def admin_or_correct_user
      user = User.find(params[:id])
      current_user = ApiKey.find_by_access_token(params[:access_token]).user
      head :unauthorized unless (current_user.id == user.id or current_user.admin == 1)
    end

    def admin_user
      head :unauthorized unless @current_user.admin == 1
    end
end
