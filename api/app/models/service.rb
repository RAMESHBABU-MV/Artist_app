class Service < ApplicationRecord
  belongs_to :artist_profile
  belongs_to :service_category, optional: true
end
