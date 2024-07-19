import { createContext, useEffect, useState } from "react";
import axios from "axios";


  
  export const Storecontext= createContext(null)

  const Storecontextprovider=(props)=>{
    const [token,settoken]=useState("")
    
    const [cartitems,setcartitems]=useState({})
    const url="http://localhost:4000"
    const [food_list,setFoodlist] =useState([])

    const addtocart= async (itemId)=>{
      if(!cartitems[itemId]){
        setcartitems((prev)=>({...prev,[itemId]:1}))
      }else{
        setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }
      if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
    }
    const removefromcart=async(itemId)=>{
      setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
      if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      }
    }

    const gettotalCartAmount=()=>{
      let totalAmount=0
      for(const item in cartitems){
        if(cartitems[item]>0)
          {let iteminfo= food_list.find((product)=>product._id===item)
          totalAmount+=iteminfo.price* cartitems[item]}
        
      }
      return totalAmount
    }
    const fetchFoodlist=async()=>{
      const response= await axios.get(url+"/api/food/list")
      setFoodlist(response.data.data)
    }
    const loadCartData=async(token)=>{
     const response= await axios.post(url+"/api/cart/get",{},{headers:{token}})
      setcartitems(response.data.cartData)

    }
    

    useEffect(()=>{
     
      async function loadData(){
        await fetchFoodlist()
        if(localStorage.getItem("token")){
          settoken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"))
        }

      }
      loadData()

    },[])

 

    const contextvalue={

        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        gettotalCartAmount,
        url,
        token,
        settoken
       
    }
    return(
        <Storecontext.Provider value={contextvalue}>
            {props.children}
        </Storecontext.Provider>
    )
  }
export default Storecontextprovider