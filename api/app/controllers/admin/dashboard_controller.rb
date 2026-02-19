class Admin::DashboardController < ApplicationController
  def index
    render json: {
      stats: {
        total_users: User.count,
        total_artists: ArtistProfile.count,
        total_bookings: Booking.count,
        total_payments: Payment.sum(:amount)
      },
      message: "Welcome to the Admin Dashboard"
    }
  end
end
