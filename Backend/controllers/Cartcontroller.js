import Usermodel from "../models/Usermodel.js"

//add items to the user cart

const addtocart = async (req, res) => {

    try {
        let userData= await Usermodel.findById(req.body.userId)
        let cartData= await userData.cartData
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }else{
            cartData[req.body.itemId]+=1
        }
        await Usermodel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to the cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }
}


//remove items from users cart
const removefromcart = async (req, res) => {
    try {
        let userData=await Usermodel.findById(req.body.userId)
        let cartData=await userData.cartData
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
        }
        await Usermodel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})

    }

}

//list user cart items 
const getcart = async (req, res) => {
    try {
        let userData= await Usermodel.findById(req.body.userId)
        let cartData= await userData.cartData
        res.json({success:true,cartData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }

}

export { addtocart, removefromcart, getcart }