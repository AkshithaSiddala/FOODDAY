import Usermodel from "../models/Usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login

const loginUser=async(req,res)=>{

    const{email,password}=req.body
    try {
        const user= await Usermodel.findOne({email})

        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const isMatch= await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"invalid credentials"})
        }
        const token= createtoken(user._id)
        res.json({success:true,token})
    } catch (error) {
        res.json({success:"false",message:"error"})
        console.log(error)
        
    }

}

const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const exists= await Usermodel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"enter a strong password"})
        }
        //hashing
        const salt= await bcrypt.genSalt(10)
        const hashpassword= await bcrypt.hash(password,salt)

        const newUser= new Usermodel({
            name:name,
            email:email,
            password:hashpassword
        })

        const user= await newUser.save()
        const token= createtoken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }
}
   
           

export {loginUser,registerUser}