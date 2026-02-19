class CreateServices < ActiveRecord::Migration[8.1]
  def change
    create_table :services, id: :uuid do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.integer :duration_minutes
      t.references :artist_profile, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
