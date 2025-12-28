import { Pool } from "pg";
import config from ".";

export const pool = new Pool({connectionString: `${config.constion}`})

export const intDB = async ()=>{
    await pool.query(
        `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL CHECK(role in('admin','customer'))
        )`
    );
    await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS
        unique_lower_email
        ON users (LOWER(email))
        `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(100) NOT NULL CHECK(type in('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK(daily_rent_price > 0),
        availability_status VARCHAR(10) DEFAULT 'available' CHECK(availability_status in ('available', 'booked'))
        )
        `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) NOT NULL,
        vehicle_id INT REFERENCES vehicles(id) NOT NULL,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10,2) CHECK(total_price > 0) NOT NULL,
        status VARCHAR(20) CHECK(status in ('active', 'cancelled','returned')) NOT NULL,
        CHECK (rent_end_date > rent_start_date)
        )
        `);
}




