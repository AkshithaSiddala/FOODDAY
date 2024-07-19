import React, { useContext } from 'react'

import "./Placeorder.css"
import { Storecontext } from '../../Context/Storecontext'

const Placeorder = () => {
  const {gettotalCartAmount}=useContext(Storecontext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery info</p>
        <div className="multi-fields">
          <input type="text" placeholder='first name' />
          <input type="text" placeholder='last name'/>
        </div>
        <input type="email" placeholder='email address'/>
        <input type="text" placeholder='street'/>
        <div className="multi-fields">
          <input type="text" placeholder='city' />
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='zip code' />
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text" placeholder='Phone' />


      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${gettotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${gettotalCartAmount()===0? 0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${gettotalCartAmount()===0? 0: gettotalCartAmount() + 2}</b>
            </div>
          </div>
          <button >PROCEED TO PAYMENT</button>
        </div>

      </div>

    </form>
)}

export default Placeorder
