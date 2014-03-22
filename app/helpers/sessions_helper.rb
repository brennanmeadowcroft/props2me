module SessionsHelper
  def sign_in(user)
    api_key = user.api_key.create

  end

  def current_user=(user)
    @current_user = user
  end
end
