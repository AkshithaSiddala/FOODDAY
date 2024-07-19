import mongoose from "mongoose";

const Foodschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

const Foodmodel= mongoose.models.food || mongoose.model("food", Foodschema)

export default Foodmodel