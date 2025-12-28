import { pool } from "../../Config/db";

const getUser = async () => {
  const result = await pool.query(`
        SELECT * FROM users
        `);
  return result;
};

const updateUser = async (payload:Record<string,unknown>) => {
  const {name, email, phone,role} = payload;
  const result = await pool.query(
    `
        UPDATE users SET name=$1, email=$2, phone=$3, role=$4 RETURING * 
        `,
    [name, email, phone,role]
  );
  return result;
};


const deleteUser = async (user_id:number)=>{

  const checkActiveBooking = await pool.query(`
    SELECT 1 FROM bookings WHERE customer_id=$1 AND status='booked'
    LIMIT 1
    `,[user_id])

  if(checkActiveBooking.rows.length > 0){
    throw new Error("User has active bookings. Cannot delete user.");
  }

  const deleteResult = await pool.query(`
    DELETE FROM users WHERE  id=$1 RETURNING *
    `,[user_id]);
  
  if(deleteResult.rowCount === 0){
     throw new Error("User not found");
  }
  return deleteResult.rows[0];
}


export const userServer = {
  getUser,
  updateUser,
  deleteUser
};
