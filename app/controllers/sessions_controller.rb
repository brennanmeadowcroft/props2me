class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:session][:email].downcase)

    respond_to do |format|
      # Authenticate the user if found
      if !@user.nil? && @user.authenticate(params[:session][:password])
        # sign_in user
        # Check if the user has an existing api key.  If not expired, use it...
        if @user.api_key and ApiKey.verify_access_token(@user.api_key)
          format.json { render json: @user, serializer: UserLoginSerializer, root: false }
        else # Otherwise create a new api key
          if @user.api_key.create
            format.json { render json: @user, serializer: UserLoginSerializer, root: false }
          end
        end
      else # Could not authenticate for some reason
        if @user.nil?
          # If the user used a completely non-existent email address
          format.json { render json: @user, status: :unauthorized }
        else
          format.json { render json: @user.errors, status: :unauthorized }
        end
      end
    end
  end

  def destroy
    @user = User.find(params)
    # Expire all the tokens (there should only be one, but still...)
    @user.api_keys.each do |k|
      k.expire_token
    end
  end
end
