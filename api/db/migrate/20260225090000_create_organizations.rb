class CreateOrganizations < ActiveRecord::Migration[8.1]
  def change
    create_table :organizations, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.string :phone
      t.string :email
      t.string :address
      t.string :city
      t.string :state
      t.string :country
      t.string :logo_url
      t.string :website
      t.string :status, default: "active"

      t.timestamps
    end

    add_index :organizations, :name
  end
end
