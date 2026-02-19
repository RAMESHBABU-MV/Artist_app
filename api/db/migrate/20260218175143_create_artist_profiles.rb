class CreateArtistProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :artist_profiles, id: :uuid do |t|
      t.text :bio
      t.integer :experience_years
      t.string :city
      t.decimal :base_price
      t.boolean :is_approved
      t.datetime :approved_at
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
