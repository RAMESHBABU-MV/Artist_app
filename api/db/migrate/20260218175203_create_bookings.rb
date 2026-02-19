class CreateBookings < ActiveRecord::Migration[8.1]
  def change
    create_table :bookings, id: :uuid do |t|
      t.references :service, null: false, foreign_key: true, type: :uuid
      t.references :artist_profile, null: false, foreign_key: true, type: :uuid
      t.uuid :customer_id
      t.date :booking_date
      t.time :start_time
      t.time :end_time
      t.string :status
      t.decimal :total_amount
      t.string :stripe_payment_intent_id

      t.timestamps
    end
  end
end
