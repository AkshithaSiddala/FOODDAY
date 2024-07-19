import React, { useContext } from 'react'
import "./Cart.css"
import { Storecontext } from '../../Context/Storecontext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { food_list, cartitems, removefromcart, gettotalCartAmount,url } = useContext(Storecontext)
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitems[item._id] > 0) {
            return (
              <div>
                <div key={index} className="cart-items-title cart-items-item" >
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p> ${item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>${item.price * cartitems[item._id]}</p>
                  <p className='cross' onClick={() => removefromcart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")} >PROCEED TO CHECK OUT</button>
        </div>
        <div className='cart-promocode'>
          <p>If you have promo code enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Cart
