# Artist Booking Platform

A production-oriented full-stack application that enables customers to book makeup appointments with verified professional artists.

The system provides structured scheduling, service management, secure booking workflows, payment tracking, and post-service reviews, designed with scalability and separation of concerns in mind.

## Project Structure
```
## Project Structure

Artist_app
├── api/         # Rails API backend
├── web_app/     # React web client
├── mobile_app/  # Mobile client
└── docker-compose.yml
```

## Built With

### Backend
- Ruby on Rails 8.1 (API Mode)
- PostgreSQL 17
- Puma (Application Server)

- JWT & BCrypt (Authentication)
- CanCanCan (Authorization)
- ActiveModelSerializers (JSON Serialization)
- Rack CORS (Cross-Origin Handling)

- Solid Queue, Solid Cache, Solid Cable
- Kaminari (Pagination)
- Active Storage & Image Processing

- Kamal (Container Deployment)
- Bootsnap & Thruster (Performance Optimization)
- Brakeman & Bundler Audit (Security Scanning)

---

### Frontend (Web)
- React 19 + TypeScript
- Vite (Build Tooling)

- TanStack Query (Server-State Management)
- React Router DOM (Routing)
- Axios (API Client)

- Material UI & MUI Data Grid
- Emotion (Styling Engine)
- Framer Motion (Animations)
- React Select & React Toastify

- ESLint & TypeScript ESLint (Code Quality)

---

### Infrastructure
- Docker
- Docker Compose (v3.9)
- Health Checks & Resource Constraints

## Getting Started

The recommended way to run the application is via Docker.

---

### Prerequisites

Ensure the following are installed:

- Docker
- Docker Compose
- Git

---

## Running the Application (Docker)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Artist_app
```

---

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=api_production
RAILS_MASTER_KEY=your_master_key
SECRET_KEY_BASE=your_secret_key
```

Ensure `RAILS_MASTER_KEY` matches `config/master.key`.

---

### 3. Build and Start Services

```bash
docker-compose up --build
```

This will:

- Start PostgreSQL
- Build and start the Rails API
- Attach persistent storage for the database
- Run container health checks

---

### 4. Run Database Migrations

In a new terminal:

```bash
docker-compose exec api rails db:migrate
```

---

### 5. Access the Application

- API: http://localhost:3000  
- Web App: http://localhost:5173 (if running frontend separately)

---

## Stopping the Application

```bash
docker-compose down
```

To remove volumes:

```bash
docker-compose down -v
```

## Usage

Once the application is running, the platform supports the following workflows.

---

### Customer Workflow

1. Register or log in as a customer.
2. Browse available artists.
3. View artist services, pricing, and availability.
4. Select a service and available time slot.
5. Create a booking.
6. Complete payment (via Stripe integration).
7. Leave a review after the appointment is completed.

---

### Artist Workflow

1. Register as an artist.
2. Complete artist profile.
3. Create and manage services.
4. Configure availability time slots.
5. Accept and manage incoming bookings.
6. Track booking status and payments.

---

### Booking Lifecycle

- Booking is created with selected service and time slot.
- Payment intent is generated.
- Payment confirmation updates booking status.
- Booking moves through status stages (e.g., pending → confirmed → completed).
- Review becomes available post-completion.

---

### API Usage (Development)

The backend exposes RESTful endpoints under:

```
/api/v1/
```

All protected endpoints require JWT-based authentication.

## Contributing

Contributions are welcome and appreciated.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes with clear, descriptive messages.
4. Push the branch to your fork.
5. Open a Pull Request describing the changes and rationale.

---

### Contribution Guidelines

- Follow existing code structure and naming conventions.
- Ensure code passes linting and tests.
- Keep pull requests focused and scoped.
- Avoid committing sensitive data or environment files.
- Write clear commit messages.

For major changes, please open an issue first to discuss the proposed modification.