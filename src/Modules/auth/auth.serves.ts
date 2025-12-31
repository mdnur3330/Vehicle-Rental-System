import { pool } from "../../Config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../Config";

const signUpIntoDB = async (payload: Record<string,unknown>)=>{
    const {name,email,password,phone,role} = payload;
    const hashPass = await bcrypt.hash(password as string,10)
    const result = await pool.query(`
        INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *
        `,[name,email,hashPass,phone,role])
        const { password: _password, ...userWithoutPassword } = result.rows[0];
    return userWithoutPassword;
}

const logInIntoDB = async (email:string,password:string)=>{
    const checkUser = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])
        if(checkUser.rows.length === 0){
            throw new Error("User Not Found")
        }
        const user = checkUser.rows[0]
        const massPass = await bcrypt.compare(password,user.password)
        if(!massPass){
            throw new Error("Password Something Went Wroing")
        }
        const token = jwt.sign({name: user.name, email:user.email, role: user.role},config.secret as string,{
            expiresIn:"3d"
        })
         const { password: _password, ...userWithoutPassword } = user;
    return {
        token,
        userWithoutPassword
    };
}


export const authServes = {
    signUpIntoDB,
    logInIntoDB
}