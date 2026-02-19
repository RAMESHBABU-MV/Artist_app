class CreateReviews < ActiveRecord::Migration[8.1]
  def change
    create_table :reviews, id: :uuid do |t|
      t.references :booking, null: false, foreign_key: true, type: :uuid
      t.references :artist_profile, null: false, foreign_key: true, type: :uuid
      t.uuid :customer_id
      t.integer :rating
      t.text :comment

      t.timestamps
    end
  end
end
