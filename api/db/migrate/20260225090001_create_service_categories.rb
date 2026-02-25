class CreateServiceCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :service_categories, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.string :icon
      t.integer :sort_order, default: 0
      t.boolean :is_active, default: true

      t.timestamps
    end

    add_index :service_categories, :name, unique: true

    # Add category reference to services
    add_reference :services, :service_category, type: :uuid, foreign_key: true
  end
end
