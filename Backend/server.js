 import express from "express"
 import cors from "cors"
import { connectDB } from "./config/db.js"
import FoodRouter from "./routes/FoodRoute.js"
import UserRouter from "./routes/UserRoute.js"
import "dotenv/config"
import CartRouter from "./routes/CartRoute.js"
//app config
 const app=express()
 const port=4000

 //middleware
 app.use(express.json())
 app.use(cors())

 //db connection
connectDB(); 

//api endpoints
app.use("/api/food", FoodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",UserRouter)
app.use("/api/cart",CartRouter)



 app.get("/",(req,res)=>{
    res.send("API Working")
 })

 app.listen(port,()=>{
    console.log(`Server running at port ${port} `)
 })

 //mongodb+srv://Akshitha:Akshitha@cluster0.4xn8wcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

