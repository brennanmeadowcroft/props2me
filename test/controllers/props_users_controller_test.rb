require 'test_helper'

class PropsUsersControllerTest < ActionController::TestCase
  setup do
    @props_user = props_users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:props_users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create props_user" do
    assert_difference('PropsUser.count') do
      post :create, props_user: {  }
    end

    assert_redirected_to props_user_path(assigns(:props_user))
  end

  test "should show props_user" do
    get :show, id: @props_user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @props_user
    assert_response :success
  end

  test "should update props_user" do
    patch :update, id: @props_user, props_user: {  }
    assert_redirected_to props_user_path(assigns(:props_user))
  end

  test "should destroy props_user" do
    assert_difference('PropsUser.count', -1) do
      delete :destroy, id: @props_user
    end

    assert_redirected_to props_users_path
  end
end
