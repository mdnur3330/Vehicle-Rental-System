import { pool } from "../../Config/db";

const getUser = async () => {
  const result = await pool.query(`
        SELECT id,name,email,phone,role FROM users
        `);
  return result;
};

const updateUser = async (
  payload: Record<string, unknown>,
  id: number,
  role: string
) => {

  const allowedFields =
    role === "admin"
      ? ["name", "email", "phone", "role"]
      : ["name", "email", "phone"];

  const filteredPayload = Object.keys(payload)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = payload[key];
      return obj;
    }, {});

  const keys = Object.keys(filteredPayload);

  if (keys.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(filteredPayload);

  const query = `
    UPDATE users
    SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING id, name, email, phone, role
  `;

  const result = await pool.query(query, [...values, id]);
  return result;
};

const deleteUser = async (user_id: number) => {
  const checkActiveBooking = await pool.query(
    `
    SELECT 1 FROM bookings WHERE customer_id=$1 AND status='booked'
    LIMIT 1
    `,
    [user_id]
  );

  if (checkActiveBooking.rows.length > 0) {
    throw new Error("User has active bookings. Cannot delete user.");
  }

  const deleteResult = await pool.query(
    `
    DELETE FROM users WHERE  id=$1 RETURNING *
    `,
    [user_id]
  );

  if (deleteResult.rowCount === 0) {
    throw new Error("User not found");
  }
  return deleteResult.rows[0];
};

export const userServer = {
  getUser,
  updateUser,
  deleteUser,
};
