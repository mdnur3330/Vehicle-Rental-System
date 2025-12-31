import { pool } from "../../Config/db"

const getBookings = async ()=>{
    const result = pool.query(`
        SELECT * FROM bookings
        `)
    return result;
}
const createBooking = async (payload:Record<string,unknown>)=>{
    console.log("serves asece",payload);
    const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = payload;
    const result = await pool.query(`
        INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *
        `,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status])
    return result
}
const updateBooking = async ()=>{
    console.log("helo");
}

export const bookingsServes = {
    getBookings,
    createBooking,
    updateBooking
}