Rails.application.routes.draw do
  # System Health
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      # Authentication
      post "login", to: "sessions#create"
      post "signup", to: "registrations#create"
      patch "password/update", to: "passwords#update"
      delete "logout", to: "sessions#destroy"
      get "me", to: "sessions#me"

      # Dashboard
      get "dashboard", to: "dashboard#index"
      get "dashboard/admin", to: "dashboard#admin"
      get "dashboard/artist", to: "dashboard#artist"

      # Admin Dashboard APIs
      namespace :admin do
        get "dashboard", to: "dashboard#index"
        get "recent-bookings", to: "dashboard#recent_bookings"
        get "top-artists", to: "dashboard#top_artists"
      end

      # Resources
      resources :users
      resources :artist_profiles
      resources :services
      resources :service_categories
      resources :organizations

      resources :bookings do
        collection do
          get :my_bookings
          get :artist_bookings
        end
      end

      resources :availabilities
      resources :reviews
      resources :payments

      # Nested: artist availability
      get "artists/:artist_id/availability", to: "availabilities#artist_availability"
    end
  end
end
