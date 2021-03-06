class Api::GoalsController < ApplicationController
  before_action :set_goal, only: [:show, :edit, :update, :destroy]
#  before_filter :restrict_access

  def index
    if !params[:user_id].nil?
      @goals = Goal.find_all_by_user_id(params[:user_id])
    else
      @goals = Goal.all
    end
    respond_to do |format|
      format.json { render json: @goals }
    end
  end

  def show
    @goal = Goal.find(params[:id])
    respond_to do |format|
      format.json { render json: @goal, root: false}
    end
  end

  def create
    @goal = Goal.new(goal_params)

    respond_to do |format|
      if @goal.save
        format.json { render json: @goal, status: :created, root: false }
      else
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @goal.update(goal_params)
        format.json { head :no_content }
      else
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def complete
    @goal = Goal.find(params[:id])
    @goal.complete_flag = !@goal.complete_flag

    respond_to do |format|
      if @goal.save
        format.json { head :no_content }
      else
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @goal.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_goal
      @goal = Goal.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def goal_params
      params.require(:goal).permit(:user_id, :name, :description)
    end

    def restrict_access
      api_key = ApiKey.find_by_access_token(params[:access_token])
      head :unauthorized unless api_key
    end
end
