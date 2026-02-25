module Api
  module V1
    class OrganizationsController < ApplicationController
      include Crudable

      private

      def organization_params
        params.require(:organization).permit(
          :name, :description, :phone, :email,
          :address, :city, :state, :country,
          :logo_url, :website, :status
        )
      end

      def resource_params
        organization_params
      end

      def collection
        Organization.order(name: :asc)
      end
    end
  end
end
