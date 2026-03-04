class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :phone, :email, :address, :city, :state, :country, :logo_url, :website, :status, :created_at, :updated_at
end
