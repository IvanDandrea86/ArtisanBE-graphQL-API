import dotenv from "dotenv"
dotenv.config()
export const VALID_PASSWORD_8_A_1= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
export const VAILDEMAIL=  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const SECRET=process.env.SECRET
export const PORT= process.env.PORT ? process.env.PORT : 4000  