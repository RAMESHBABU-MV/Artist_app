class Booking < ApplicationRecord
  belongs_to :service
  belongs_to :artist_profile
  belongs_to :customer, class_name: "User", foreign_key: :customer_id

  has_one :payment, dependent: :destroy
  has_one :review, dependent: :destroy

  STATUSES = %w[pending confirmed completed cancelled].freeze
  validates :status, inclusion: { in: STATUSES }, allow_nil: true
end
