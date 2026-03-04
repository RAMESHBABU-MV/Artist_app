class Organization < ApplicationRecord
  STATUSES = %w[active inactive].freeze

  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
  validates :status, inclusion: { in: STATUSES }
end
