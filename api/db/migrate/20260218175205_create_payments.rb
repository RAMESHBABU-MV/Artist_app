class CreatePayments < ActiveRecord::Migration[8.1]
  def change
    create_table :payments, id: :uuid do |t|
      t.references :booking, null: false, foreign_key: true, type: :uuid
      t.string :stripe_payment_intent_id
      t.decimal :amount
      t.string :currency
      t.string :payment_status

      t.timestamps
    end
  end
end
