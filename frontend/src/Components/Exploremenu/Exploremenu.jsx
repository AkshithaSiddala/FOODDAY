import React from 'react'
import "./Exploremenu.css"
import { menu_list } from '../../assets/assets'


const Exploremenu = ({category,setcategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Dive into menu</h1>
        <p className='explore-menu-text'>
        Explore our varied menu, offering a tempting assortment of dishes prepared with top-quality ingredients and culinary mastery. Our aim is to fulfill your cravings and elevate your dining experience, one savory bite at a time.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name? "All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name? "active" :""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
      
    </div>
  )
}

export default Exploremenu
