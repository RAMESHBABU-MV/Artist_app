module Api
  module V1
    class ServiceCategoriesController < ApplicationController
      include Crudable

      private

      def service_category_params
        params.require(:service_category).permit(:name, :description, :icon, :sort_order, :is_active)
      end

      def resource_params
        service_category_params
      end

      def collection
        ServiceCategory.sorted
      end
    end
  end
end
