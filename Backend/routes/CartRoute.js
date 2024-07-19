import express from "express"
import { addtocart,removefromcart,getcart } from "../controllers/Cartcontroller.js"
import authMiddleware from "../middleware/Auth.js"
const CartRouter= express.Router()

CartRouter.post("/add", authMiddleware,addtocart)
CartRouter.post("/remove",authMiddleware,removefromcart)
CartRouter.get("/list",authMiddleware,getcart)



export default CartRouter





