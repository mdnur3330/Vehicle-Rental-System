import dotenv from "dotenv";
import path from 'path'


dotenv.config({path: path.join(process.cwd(),".env")})

const config = {
    constion: process.env.CONSTION_STR,
    port: process.env.PORT,
    secret: process.env.SECRET 
}
export default config