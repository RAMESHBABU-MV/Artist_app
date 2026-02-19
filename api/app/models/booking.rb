class Booking < ApplicationRecord
  belongs_to :service
  belongs_to :artist_profile
end
