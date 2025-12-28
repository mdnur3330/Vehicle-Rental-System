import { pool } from "../../Config/db"

const getVehicle = async()=>{
    const result = await pool.query(`
        SELECT * FROM Vehicles
        `)
    return result;
} 
const getSingleVehicles = async(id:number)=>{
    const result = await pool.query(`
        SELECT * FROM vehicles WHERE id=$1
        `,[id])
    return result;
} 

const createVehicles = async (payload: Record<string,unknown>)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = payload;
        const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) values($1,$2,$3,$4,$5) RETURNING *
        `,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
    return result;
}  

const updateVehicles = async (payload:Record<string,unknown>,vehicle_id:number)=>{
    const {vehicle_name,type, registration_number,daily_rent_price,availability_status} = payload;
    const result = await pool.query(`
        UPDATE vehicles SET vehicle_name=$1, type =$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *
        `,[vehicle_name,type, registration_number,daily_rent_price,availability_status,vehicle_id])
    return result;
}


const deleteVehicles = async (vehicle_id:number)=>{
    const checkActiveBooking = await pool.query(`
        SELECT 1 FROM bookings WHERE vehicle_id =$1 AND status='booked' LIMIT 1
        `,[vehicle_id])

    if(checkActiveBooking.rows.length > 0){
         throw new Error("Vehicle has active bookings. Cannot delete.");
    }

    const deleteResult = await pool.query(`
        DELETE FROM vehicles WHERE id=$1
        `,[vehicle_id])
    
    if(deleteResult.rowCount === 0){
        throw new Error("Not Found")
    }
    return deleteResult;
}


export const vehicleServes = {
    getVehicle,
    createVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
}