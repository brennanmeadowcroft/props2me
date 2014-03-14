class Api::BadgesController < ApplicationController
  before_action :set_badge, only: [:show, :edit, :update, :destroy]

  def index
    if !params[:user_id].nil?
      @badges = Badge.find_all_by_user_id(params[:user_id])
    else
      @badges = Badge.all
    end
    respond_to do |format|
      format.json { render json: @badges }
    end
  end

  def show
    @badge = Badge.find(params[:id])
    respond_to do |format|
      format.json { render json: @badge }
    end
  end

  def create
    @badge = Badge.new(badge_params)

    respond_to do |format|
      if @badge.save
        format.json { render action: 'show', status: :created, location: @badge }
      else
        format.json { render json: @badge.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @badge.update(badge_params)
        format.json { head :no_content }
      else
        format.json { render json: @badge.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @badge.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_badge
      @badge = Badge.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def badge_params
      params.require(:badge).permit(:name, :description)
    end
end
