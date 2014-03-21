class Api::PropsController < ApplicationController
  before_action :set_prop, only: [:show, :edit, :update, :destroy]
  before_filter :restrict_access

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
    @prop = Prop.new(prop_params)

    respond_to do |format|
      if @prop.save
        format.json { render action: 'show', status: :created, location: @prop }
      else
        format.json { render json: @prop.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @prop.update(prop_params)
        format.json { head :no_content }
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
      params.require(:prop).params(:goal_id, :comments)
    end

    def restrict_access
      api_key = ApiKey.find_by_access_token(params[:access_token])
      head :unauthorized unless api_key
    end
end
