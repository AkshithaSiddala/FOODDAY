import mongoose from "mongoose"

export const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://Akshitha:Akshitha@cluster0.4xn8wcp.mongodb.net/food-del").then(()=>console.log("DB connected"))
}
