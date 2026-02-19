class CreateAvailabilities < ActiveRecord::Migration[8.1]
  def change
    create_table :availabilities, id: :uuid do |t|
      t.references :artist_profile, null: false, foreign_key: true, type: :uuid
      t.date :available_date
      t.time :start_time
      t.time :end_time
      t.boolean :is_booked

      t.timestamps
    end
  end
end
