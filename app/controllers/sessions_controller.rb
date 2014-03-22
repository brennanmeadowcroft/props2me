class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:session][:email].downcase)

    respond_to do |format|
      # Authenticate the user
      if @user && @user.authenticate(params[:session][:password])
        # sign_in user
        # Check if the user has an existing api key.  If not expired, use it...
        if !@user.api_key.nil? and ApiKey.verify_access_token(@user.api_key)
          format.json { render json: @user, serializer: SessionsSerializer }
        else # Otherwise create a new one
          format.json { render @user.errors, status: :unauthorized }
        end
      else # Could not authenticate
        format.json { render @user.errors, status: :unauthorized }
      end
    end
  end

  def destroy
    # Expire the token
  end
end
