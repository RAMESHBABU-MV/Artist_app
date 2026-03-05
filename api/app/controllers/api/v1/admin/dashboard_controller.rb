module Api
  module V1
    module Admin
      class DashboardController < ApplicationController
        before_action :authorize_admin

        # GET /api/v1/admin/dashboard
        def index
          render_success(
            data: {
              total_users: User.count,
              total_artists: ArtistProfile.count,
              total_bookings: Booking.count,
              revenue: Payment.sum(:amount).to_f
            },
            message: "Admin dashboard stats retrieved successfully"
          )
        end

        # GET /api/v1/admin/recent-bookings
        def recent_bookings
          bookings = Booking.includes(:service, :customer, :artist_profile).order(created_at: :desc).limit(10)
          render_success(
            data: ActiveModelSerializers::SerializableResource.new(
              bookings,
              each_serializer: BookingSerializer
            ).as_json,
            message: "Recent bookings retrieved successfully"
          )
        end

        # GET /api/v1/admin/top-artists
        def top_artists
          # Top 5 artists by completed bookings
          artists = ArtistProfile.joins(:bookings)
                                 .where(bookings: { status: 'completed' })
                                 .group('artist_profiles.id')
                                 .select('artist_profiles.*, COUNT(bookings.id) as bookings_count')
                                 .order('bookings_count DESC')
                                 .limit(5)

          render_success(
            data: artists.map { |artist| 
              {
                id: artist.id,
                name: artist.name.presence || artist.user&.name || artist.user&.email,
                bookings_count: artist.attributes['bookings_count'],
                city: artist.city,
                base_price: artist.base_price.to_f
              }
            },
            message: "Top artists retrieved successfully"
          )
        end

        private

        def authorize_admin
          unless current_user&.role == 'admin'
            render_error(message: "Unauthorized access", status: :forbidden)
          end
        end
      end
    end
  end
end
