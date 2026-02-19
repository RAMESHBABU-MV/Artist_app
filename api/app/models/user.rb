class User < ApplicationRecord
  has_one :artist_profile, dependent: :destroy
  has_many :bookings, foreign_key: :customer_id, dependent: :destroy
  has_many :reviews, foreign_key: :customer_id, dependent: :destroy

  validates :email, presence: true, uniqueness: true
end
