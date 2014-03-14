class Api::PropsUsersController < ApplicationController
  before_action :set_props_user, only: [:show, :edit, :update, :destroy]

  # GET /props_users
  # GET /props_users.json
  def index
    @props_users = PropsUser.all
  end

  # GET /props_users/1
  # GET /props_users/1.json
  def show
  end

  # GET /props_users/new
  def new
    @props_user = PropsUser.new
  end

  # GET /props_users/1/edit
  def edit
  end

  # POST /props_users
  # POST /props_users.json
  def create
    @props_user = PropsUser.new(props_user_params)

    respond_to do |format|
      if @props_user.save
        format.html { redirect_to @props_user, notice: 'Props user was successfully created.' }
        format.json { render action: 'show', status: :created, location: @props_user }
      else
        format.html { render action: 'new' }
        format.json { render json: @props_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /props_users/1
  # PATCH/PUT /props_users/1.json
  def update
    respond_to do |format|
      if @props_user.update(props_user_params)
        format.html { redirect_to @props_user, notice: 'Props user was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @props_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /props_users/1
  # DELETE /props_users/1.json
  def destroy
    @props_user.destroy
    respond_to do |format|
      format.html { redirect_to props_users_url }
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
      params.require(:props_user).params(:user_id, :prop_id, :recipient_flag, :anonymous_flag)
    end
end
