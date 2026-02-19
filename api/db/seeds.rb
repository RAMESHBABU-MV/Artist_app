# Create default admin user
User.find_or_create_by!(email: 'admin@jothis.com') do |user|
  user.password = 'password123'
  user.role = 'admin'
  user.status = 'active'
end

