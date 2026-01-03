# 🚗 Vehicle Rental Management System – Backend API

A feature-rich backend API for managing a vehicle rental system with role-based access control.  
Built using **Node.js, TypeScript, Express.js, and PostgreSQL** following a **modular, scalable architecture**.

---

## 🎯 Project Features

- 🔐 JWT-based Authentication & Authorization
- 👤 Role-based Access Control (Admin & Customer)
- 🚙 Vehicle Inventory Management
- 📅 Booking & Rental Management
- 💰 Automatic Rental Cost Calculation
- 🔄 Availability Tracking
- 🧩 Modular, Feature-based Code Structure

---

## 🛠️ Technology Stack

| Technology | Purpose |
|----------|--------|
| Node.js | Runtime |
| TypeScript | Type safety |
| Express.js | Web framework |
| PostgreSQL | Relational database |
| bcrypt | Password hashing |
| jsonwebtoken (JWT) | Authentication |

4. Protected routes validate token & role

### 👥 User Roles
- **Admin**
- Manage vehicles, users & all bookings
- **Customer**
- View vehicles
- Create & manage own bookings
- Update own profile

---

## 🌐 API Endpoints

### 🔓 Authentication
| Method | Endpoint | Access |
|-----|---------|-------|
| POST | `/api/v1/auth/signup` | Public |
| POST | `/api/v1/auth/signin` | Public |

### 🚘 Vehicles
| Method | Endpoint | Access |
|-----|---------|-------|
| POST | `/api/v1/vehicles` | Admin |
| GET | `/api/v1/vehicles` | Public |
| GET | `/api/v1/vehicles/:vehicleId` | Public |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin |

> ❗ Vehicle delete only allowed if **no active bookings exist**

---

### 👤 Users
| Method | Endpoint | Access |
|-----|---------|-------|
| GET | `/api/v1/users` | Admin |
| PUT | `/api/v1/users/:userId` | Admin / Own |
| DELETE | `/api/v1/users/:userId` | Admin |

---

### 📅 Bookings
| Method | Endpoint | Access |
|-----|---------|-------|
| POST | `/api/v1/bookings` | Customer / Admin |
| GET | `/api/v1/bookings` | Role-based |
| PUT | `/api/v1/bookings/:bookingId` | Role-based |

#### 📌 Booking Rules
- Vehicle must be **available**
- Total price = `daily_rent_price × rental_days`
- On booking → vehicle status becomes `booked`
- Customer can cancel **before start date**
- Admin can mark booking as `returned`
- System auto-marks booking as `returned` after end date

---

## ⚙️ Environment Variables

Create a `.env` file:



