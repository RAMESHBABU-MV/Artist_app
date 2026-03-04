class ServiceCategory < ApplicationRecord
  has_many :services, dependent: :nullify

  validates :name, presence: true, uniqueness: true

  scope :active, -> { where(is_active: true) }
  scope :sorted, -> { order(sort_order: :asc, name: :asc) }
end
