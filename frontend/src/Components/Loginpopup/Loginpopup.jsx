import React, { useContext, useState } from 'react'
import "./Loginpopup.css"
import { assets } from '../../assets/assets'
import { Storecontext } from '../../Context/Storecontext'
import axios from "axios"

const Loginpopup = ({setshowlogin}) => {
    const {url,settoken}=useContext(Storecontext)
    
    
    const [currstate,setcurrstate]=useState("login")
    const[data,setdata]=useState({
        name:"",
        email:"",
        password:""
    })

    const onchangehandler =(event)=>{
        const name=event.target.name
        const value=event.target.value
        setdata(data=>({...data,[name]:value}))
    }
    const onlogin=async(event)=>{
        event.preventDefault()
        let newUrl=url
        if(currstate==="login"){
            newUrl+= "/api/user/login"
        }else{
            newUrl+= "/api/user/register"
        }

        const response= await axios.post(newUrl,data)
        if(response.data.success){
            settoken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setshowlogin(false)
        }else{
            alert(response.data.message)
        }

    }


  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onlogin}>
            <div className="login-popup-title">
                <h2>{currstate}</h2>
                <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currstate==="login"? <></>:<input type="text" placeholder='name' name='name'value={data.name} onChange={onchangehandler}required />}   
                <input type="email" placeholder='email' name='email'value={data.email} onChange={onchangehandler} required />
                <input type="password" placeholder='password'  name='password'value={data.password} onChange={onchangehandler} required />
            </div>
            <button type='submit'>{currstate==="Sign up"? "create account":"login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required />
                <p>By checking the above box i agree to the terms and conditions</p>
            </div>
            {currstate==="login"?
            <p>Create a a new account? <span onClick={()=>setcurrstate("Sign up")}> click here</span></p>:
            <p>Already have an account? <span onClick={()=>setcurrstate("login")} >Login</span></p>}
        </form>
    </div>
  )
}

export default Loginpopup
