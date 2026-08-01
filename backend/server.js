import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import dns from "dns";
import userRoutes from './Routes/user.js'

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config()
const app = express()

app.use(express.json())
app.use("/api/users" , userRoutes)
///2FUNcl2F807epOwy
const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    connectDB()
    console.log(`Server is running   port ${PORT}`)
})