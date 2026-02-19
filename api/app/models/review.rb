class Review < ApplicationRecord
  belongs_to :booking
  belongs_to :artist_profile
end
