class BookingSerializer < ActiveModel::Serializer
  attributes :id, :artist_profile_id, :service_id, :customer_id, :booking_date, :start_time, :end_time, :status, :total_amount, :service_name, :customer_name, :created_at
  belongs_to :artist_profile
  belongs_to :service
  belongs_to :customer, class_name: "User"
  has_one :payment
  has_one :review

  def service_name
    object.service&.name
  end

  def customer_name
    object.customer&.name || object.customer&.email
  end
end
