# Artist Booking Platform – API

Backend service powering the Artist Booking Platform.  
Provides a structured RESTful API for clients, artists, and administrators.

Built with Ruby on Rails (API-only mode) and designed with role-based access control, secure authentication, and scalable service architecture.

---
```
Artist_app
├── api
│   ├── .github
│   │   └── workflows
│   ├── .kamal
│   │   └── hooks
│   ├── app
│   │   ├── controllers
│   │   │   ├── api
│   │   │   │   └── v1
│   │   │   └── concerns
│   │   ├── jobs
│   │   ├── mailers
│   │   ├── models
│   │   │   └── concerns
│   │   ├── serializers
│   │   └── views
│   │       └── layouts
│   ├── bin
│   ├── config
│   │   ├── environments
│   │   ├── initializers
│   │   └── locales
│   ├── db
│   │   └── migrate
│   ├── lib
│   │   └── tasks
│   ├── log
│   ├── public
│   ├── script
│   ├── storage
│   ├── test
│   │   ├── controllers
│   │   ├── fixtures
│   │   │   └── files
│   │   ├── integration
│   │   ├── mailers
│   │   └── models
│   └── vendor
│
├── mobile_app
│   ├── app
│   │   ├── (tabs)
│   │   └── admin_panel
│   ├── assets
│   │   ├── fonts
│   │   └── images
│   ├── components
│   │   ├── admin
│   │   └── __tests__
│   ├── constants
│   └── utils
│
└── web_app
    ├── public
    └── src
        ├── assets
        ├── components
        │   └── common
        ├── hooks
        ├── pages
        └── services
```

## Tech Stack

### Core
- Ruby
- Ruby on Rails 8.1 (API Mode)
- PostgreSQL
- Puma

### Authentication & Authorization
- JWT (custom Sessions & Registrations)
- CanCanCan (Role-Based Access Control)

### Data Handling
- Active Model Serializers
- Kaminari (Pagination)
- Active Storage + image_processing

### Infrastructure
- rack-cors (CORS handling)

---

## API Base Path
```
/api/v1/
```

All protected endpoints require a valid JWT in the `Authorization` header.

---

## Core Capabilities

### Authentication
- Login
- Registration
- Logout
- Update credentials
- Current user (`/me`)

### Role-Based Dashboards
Dedicated endpoints for:
- Admin dashboard
- Artist dashboard
- Client dashboard

---

## Core Resources

### Users
- Admin, Artist, Client management

### Artist Profiles
- Profile details for service providers

### Services & Categories
- Service offerings
- Categorization

### Organizations
- Organizational grouping for artists or categories

---

## Booking System

### Availabilities
- Manage artist schedules  
- Custom route:
```
/artists/:artist_id/availability
```


### Bookings
- Create and manage bookings  
- Client: `my_bookings`  
- Artist: `artist_bookings`

### Payments
- Booking-related payment tracking

### Reviews
- Post-service ratings and feedback

---

## Local Development Setup

### Requirements
- Ruby
- PostgreSQL  

OR

- Docker
- Docker Compose

---

### Manual Setup

```bash
bundle install
rails db:create db:migrate db:seed
rails server
```
### Docker Setup
```
docker-compose up --build
```

## Health Check

To verify the application is running (without DB dependency):
```
/up
```
Returns a simple OK response if the server process is healthy.