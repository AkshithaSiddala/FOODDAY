import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {


    const [image, setimage] = useState(false)
    const [data, setdata] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"

    })
    const Changehandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setdata(data => ({ ...data, [name]: value }))
    }

    const onSubmithandler = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success) {
            setdata({
                name: "",
                description: "",
                price: "",
                category: "Salad"

            })
            setimage(false)
            toast.success(response.data.message)

        } else {
            toast.error(response.data.message)

        }


    }



    return (
        <div className="add">
            <form className='flex-col' onSubmit={onSubmithandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' required hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" onChange={Changehandler} value={data.name} name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea name="description" onChange={Changehandler} value={data.description} rows="6" placeholder='write-content'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={Changehandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={Changehandler} value={data.price} type="Number" name="price" placeholder='$20' />
                    </div>

                </div>
                <button className='add-btn' type='submit'>ADD</button>

            </form>
        </div>
    )
}

export default Add
