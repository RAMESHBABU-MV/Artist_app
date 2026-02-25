# Clear existing data
puts "Cleaning database..."
Review.destroy_all
Payment.destroy_all
Booking.destroy_all
Availability.destroy_all
Service.destroy_all
ArtistProfile.destroy_all
User.destroy_all

puts "Creating Admin..."
User.create!(
  email: 'admin@artistapp.com',
  password: 'password123',
  role: 'admin',
  status: 'active'
)

# Constants for realistic data
CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
SERVICE_NAMES = ['Basic Portrait', 'Full Body Painting', 'Logo Design', 'Digital Illustration', 'Speed Drawing', 'Character Design', 'Landscape Painting', 'Mural Design', 'Tattoo Flash', 'Calligraphy']

puts "Creating Artists..."
10.times do |i|
  artist_user = User.create!(
    email: "artist#{i+1}@example.com",
    password: 'password123',
    role: 'artist',
    status: 'active'
  )

  profile = ArtistProfile.create!(
    user: artist_user,
    bio: "Passionate artist #{i+1} specializing in various forms of visual arts. With years of experience in the industry.",
    base_price: rand(50..200),
    city: CITIES.sample,
    experience_years: rand(2..15),
    is_approved: true,
    approved_at: Time.current
  )

  # Create services for each artist
  rand(2..4).times do |j|
    Service.create!(
      artist_profile: profile,
      name: "#{SERVICE_NAMES.sample} ##{i}-#{j}",
      description: "High quality professional service provided by artist #{i+1}.",
      price: profile.base_price + rand(10..50),
      duration_minutes: [30, 60, 90, 120].sample
    )
  end

  # Create availabilities
  5.times do |k|
    Availability.create!(
      artist_profile: profile,
      available_date: Date.current + k.days,
      start_time: '09:00',
      end_time: '17:00',
      is_booked: false
    )
  end
end

puts "Creating Customers..."
10.times do |i|
  User.create!(
    email: "customer#{i+1}@example.com",
    password: 'password123',
    role: 'customer',
    status: 'active'
  )
end

puts "Creating Bookings and Reviews..."
customers = User.where(role: 'customer')
artist_profiles = ArtistProfile.all

20.times do |i|
  customer = customers.sample
  artist_profile = artist_profiles.sample
  service = artist_profile.services.sample
  booking_date = Date.current + rand(1..10).days
  
  booking = Booking.create!(
    customer_id: customer.id,
    artist_profile: artist_profile,
    service: service,
    booking_date: booking_date,
    start_time: '10:00',
    end_time: '11:00',
    status: i % 5 == 0 ? 'pending' : 'confirmed',
    total_amount: service.price
  )

  # Create payments for confirmed bookings
  if booking.status == 'confirmed'
    Payment.create!(
      booking: booking,
      amount: booking.total_amount,
      currency: 'USD',
      payment_status: 'succeeded',
      stripe_payment_intent_id: "pi_mock_#{SecureRandom.hex(10)}"
    )

    # Create reviews for some confirmed bookings
    if rand > 0.5
      Review.create!(
        customer_id: customer.id,
        artist_profile: artist_profile,
        booking: booking,
        rating: rand(3..5),
        comment: ["Great experience!", "Highly recommended.", "Amazing work!", "Very professional.", "Quality result."].sample
      )
    end
  end
end

puts "Seed completed!"
puts "Created:"
puts "- #{User.where(role: 'admin').count} Admin"
puts "- #{ArtistProfile.count} Artists"
puts "- #{User.where(role: 'customer').count} Customers"
puts "- #{Service.count} Services"
puts "- #{Booking.count} Bookings"
puts "- #{Review.count} Reviews"
