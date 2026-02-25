module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authorize_request, only: :create

      # POST /api/v1/login
      def create
        @user = User.find_by_email(params[:email])
        if @user&.authenticate(params[:password])
          token = ::JsonWebToken.encode(user_id: @user.id)
          time = Time.now + 24.hours.to_i
          render_success(
            data: { 
              token: token, 
              exp: time.strftime("%m-%d-%Y %H:%M"),
              email: @user.email,
              role: @user.role
            }, 
            message: 'Login successful'
          )
        else
          render_error(message: 'Invalid credentials', status: :unauthorized)
        end
      end

      # DELETE /api/v1/logout
      def destroy
        # With JWT there is no server-side session to destroy.
        # The client simply discards the token.
        # If you later add a token blacklist table, invalidate the token here.
        render_success(message: 'Logged out successfully')
      end

      # GET /api/v1/me
      def me
        render_success(
          data: UserSerializer.new(current_user),
          message: 'Current user retrieved successfully'
        )
      end

      private

      def login_params
        params.permit(:email, :password)
      end
    end
  end
end
