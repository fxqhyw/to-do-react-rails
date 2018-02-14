module Api::V1
  class UsersController < ApplicationController

   def show
       @user = User.find(params[:id])
       json_response(@user)
   end

   def create
    @user = User.create!(user_params)
    json_response(@user)
  end

    private
      def user_params
        params.require(:user).permit(:email, :password)
      end
  end
end
