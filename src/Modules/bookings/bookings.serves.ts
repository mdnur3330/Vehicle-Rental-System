import { pool } from "../../Config/db"

const getBookings = async ()=>{
    const result = pool.query(`
        SELECT * FROM bookings
        `)
    return result;
}
const getSingleBookings = async (id:number)=>{
    const result = pool.query(`
        SELECT * FROM bookings WHERE customer_id=$1
        `,[id])
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

const getBookingById = async (bookingId: number) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE id=$1`,
    [bookingId]
  );
  return result.rows[0];
};

const cancelBookingByCustomer = async (
  bookingId: number,
  customerId: number
) => {
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new Error("BOOKING_NOT_FOUND");
  }

  if (booking.customer_id !== customerId) {
    throw new Error("FORBIDDEN");
  }

  const today = new Date();
  const startDate = new Date(booking.rent_start_date);

  if (today >= startDate) {
    throw new Error("RENT_ALREADY_STARTED");
  }

  const result = await pool.query(
    `
    UPDATE bookings
    SET status='cancelled'
    WHERE id=$1
    RETURNING *
    `,
    [bookingId]
  );

  return result;
};

const returnBookingByAdmin = async (bookingId: number) => {
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new Error("BOOKING_NOT_FOUND");
  }

  const result = await pool.query(
    `
    UPDATE bookings
    SET status='returned'
    WHERE id=$1
    RETURNING *
    `,
    [bookingId]
  );

  await pool.query(
    `
    UPDATE vehicles
    SET status='available'
    WHERE id=$1
    `,
    [booking.vehicle_id]
  );

  return result;
};

export const bookingsServes = {
    getBookings,
    getSingleBookings,
    createBooking,
    cancelBookingByCustomer,
    returnBookingByAdmin
}