import express from "express";
import connect from './config/config.js'
import mongoose from "mongoose";
import authRoute from "./routes/routeAuth.js";
import usersRoute from "./routes/routeUsers.js";
import hotelsRoute from "./routes/routeHotels.js";
import roomsRoute from "./routes/routeRooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from 'dotenv';
env.config();
const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.MONGO;

mongoose.connection.on("disconnected", ()=>{
    console.log("Database Disconnected!")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())


//middleware
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((error, req, resp, next) =>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!";
    return resp.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message:errorMessage,
        stack: error.stack,
    })
    
})

app.listen(PORT, ()=>{
    connect(DATABASE_URL);
    console.log(`Host : localhost:${PORT}`)
})