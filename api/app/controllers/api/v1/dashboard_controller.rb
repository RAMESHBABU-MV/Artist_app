module Api
  module V1
    class DashboardController < ApplicationController
      # GET /api/v1/dashboard  (legacy — returns stats based on role)
      def index
        stats = case current_user.role
                when 'admin'  then admin_stats
                when 'artist' then artist_stats
                else customer_stats
                end

        render_success(
          data: { stats: stats },
          message: "Dashboard data retrieved successfully"
        )
      end

      # GET /api/v1/dashboard/admin
      def admin
        unless current_user.admin?
          return render_error(message: "Forbidden", status: :forbidden)
        end

        render_success(
          data: { stats: admin_stats },
          message: "Admin dashboard retrieved successfully"
        )
      end

      # GET /api/v1/dashboard/artist
      def artist
        unless current_user.artist?
          return render_error(message: "Forbidden", status: :forbidden)
        end

        render_success(
          data: { stats: artist_stats },
          message: "Artist dashboard retrieved successfully"
        )
      end

      private

      def admin_stats
        {
          total_users: User.count,
          active_users: User.where(status: "active").count,
          total_artists: ArtistProfile.count,
          approved_artists: ArtistProfile.where(is_approved: true).count,
          total_bookings: Booking.count,
          pending_bookings: Booking.where(status: "pending").count,
          confirmed_bookings: Booking.where(status: "confirmed").count,
          completed_bookings: Booking.where(status: "completed").count,
          total_services: Service.count,
          total_reviews: Review.count,
          total_revenue: Payment.sum(:amount),
          total_organizations: (Organization.count rescue 0)
        }
      end

      def artist_stats
        profile = current_user.artist_profile
        return {} unless profile

        {
          total_bookings: Booking.where(artist_profile_id: profile.id).count,
          pending_bookings: Booking.where(artist_profile_id: profile.id, status: "pending").count,
          completed_bookings: Booking.where(artist_profile_id: profile.id, status: "completed").count,
          total_services: Service.where(artist_profile_id: profile.id).count,
          total_reviews: Review.where(artist_profile_id: profile.id).count,
          average_rating: Review.where(artist_profile_id: profile.id).average(:rating)&.round(1) || 0,
          total_revenue: Payment.joins(:booking).where(bookings: { artist_profile_id: profile.id }).sum(:amount),
          upcoming_bookings: Booking.where(artist_profile_id: profile.id, status: ["pending", "confirmed"])
                                    .where("booking_date >= ?", Date.today).count
        }
      end

      def customer_stats
        {
          total_bookings: Booking.where(customer_id: current_user.id).count,
          pending_bookings: Booking.where(customer_id: current_user.id, status: "pending").count,
          completed_bookings: Booking.where(customer_id: current_user.id, status: "completed").count,
          total_spent: Payment.joins(:booking).where(bookings: { customer_id: current_user.id }).sum(:amount),
          total_reviews: Review.where(customer_id: current_user.id).count
        }
      end
    end
  end
end
