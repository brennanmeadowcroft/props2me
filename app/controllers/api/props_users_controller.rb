class Api::PropsUsersController < ApplicationController
  before_action :set_props_user, only: [:show, :edit, :update, :destroy]
#  before_filter :restrict_access

  def index
    @props_users = PropsUser.all
  end

  def show
  end

  def create
    @props_user = PropsUser.new(props_user_params)

    respond_to do |format|
      if @props_user.save
        format.json { render action: 'show', status: :created, location: @props_user }
      else
        format.json { render json: @props_user.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @props_user.update(props_user_params)
        format.json { head :no_content }
      else
        format.json { render json: @props_user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @props_user.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_props_user
      @props_user = PropsUser.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def props_user_params
      params.require(:props_user).permit(:user_id, :prop_id, :recipient_flag, :anonymous_flag)
    end

    def restrict_access
      api_key = ApiKey.find_by_access_token(params[:access_token])
      head :unauthorized unless api_key
    end
end
