module Api
  module V1
    class ServicesController < ApplicationController
      include Crudable
      load_and_authorize_resource

      private

      def service_params
        params.require(:service).permit(:artist_profile_id, :service_category_id, :name, :description, :duration_minutes, :price)
      end

      def resource_params
        service_params
      end

      def collection
        Service.all.order(name: :asc)
      end
    end
  end
end
