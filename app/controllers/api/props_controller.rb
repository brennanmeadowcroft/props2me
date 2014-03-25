class Api::PropsController < ApplicationController
  before_action :set_prop, only: [:show, :edit, :update, :destroy]
#  before_filter :restrict_access

  def index
    if !params[:user_id].nil?
      @props.Prop.find_all_by_user_id(params[:user_id])
    else
      @props = Prop.all
    end
    respond_to do |format|
      format.json { render json: @props }
    end
  end

  def show
    @prop = Prop.find(params[:id])
    respond_to do |format|
      format.json { render json: @prop }
    end
  end

  def count
    if !params[:goal_id].nil?
      @props = Prop.find_all_by_goal_id(params[:goal_id])
    else
      @props = Prop.all
    end
    respond_to do |format|
      format.json { render json: @props.count }
    end
  end

  def create
    @prop = Prop.create(goal_id: params[:goal_id], comments: params[:comments])
    @prop.props_users.create(user_id: params[:user_id], anonymous_flag: 0, recipient_flag: 1)

    #Attempt to find the user who provided the info
    user = User.find_by_email(params[:email])
    # If a user can't be found but they provided an email
    if user.nil?
      if params[:email].nil? # User did not provide an email, set to anonymous
        uid = 1
      else # User provided an email...
        # Create a user using the given email but mark them inactive
        user = User.create(email: params[:email], active: 0)
        if user.save
          # If a user can be created, set the id for the props otherwise set it blank
          uid = user.id
        else # User couldn't be saved, set it anonymous
          uid = 1
        end
      end
    else # User could be found... set the user accordingly
      uid = user.id
    end
    @prop.props_users.create(user_id: uid, anonymous_flag: 1, recipient_flag: 0)

    respond_to do |format|
      if @prop.save
        format.json { render json: @prop, status: :created }
      else
        format.json { render json: @prop.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @prop.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prop
      @prop = Prop.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def prop_params
      params.permit(:goal_id, :comments, :user_id, :anonymous_flag)
    end

    def restrict_access
      api_key = ApiKey.find_by_access_token(params[:access_token])
      head :unauthorized unless api_key
    end
end
