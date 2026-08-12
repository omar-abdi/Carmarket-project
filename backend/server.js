import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import dns from "dns";
import userRoutes from './Routes/userRouter.js'
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from './Routes/authRouter.js'

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config()
const app = express()
app.use(cookieParser());
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use("/api/users" , userRoutes)
app.use("/api/auth" , authRoutes)
///2FUNcl2F807epOwy
const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    connectDB()
    console.log(`Server is running   port ${PORT}`)
})