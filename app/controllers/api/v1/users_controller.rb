module Api::V1
  class UsersController < ApplicationController
    def create
      @input = User.new(user_params)
      if(@input.save)
        :ok
      else
        :bad_request
      end
    end

    private
      def user_params
        params.require(:user).permit(:email, :password)
      end
  end
end