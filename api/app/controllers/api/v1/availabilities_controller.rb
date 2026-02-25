module Api
  module V1
    class AvailabilitiesController < ApplicationController
      include Crudable
      load_and_authorize_resource

      # GET /api/v1/artists/:artist_id/availability
      # Returns availability slots for a specific artist
      def artist_availability
        profile = ArtistProfile.find(params[:artist_id])
        slots = Availability.where(artist_profile_id: profile.id)
                            .where("available_date >= ?", Date.today)
                            .where(is_booked: false)
                            .order(available_date: :asc, start_time: :asc)
        slots = paginate(slots)
        render_paginated_success(slots, message: "Artist availability retrieved successfully")
      end

      private

      def availability_params
        params.require(:availability).permit(:artist_profile_id, :available_date, :start_time, :end_time, :is_booked)
      end

      def resource_params
        availability_params
      end

      def collection
        Availability.all.order(available_date: :asc)
      end
    end
  end
end
