class ArtistProfile < ApplicationRecord
  belongs_to :user
  has_many :services, dependent: :destroy
  has_many :availabilities, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :reviews, dependent: :destroy

end
