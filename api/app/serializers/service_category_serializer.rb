class ServiceCategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :icon, :sort_order, :is_active, :created_at, :updated_at

  # Include count of services in this category
  attribute :services_count

  def services_count
    object.services.count
  end
end
