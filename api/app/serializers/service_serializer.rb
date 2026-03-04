class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :artist_profile_id, :service_category_id, :name, :description, :price, :duration_minutes, :created_at, :updated_at
  belongs_to :artist_profile
  belongs_to :service_category, optional: true
end
