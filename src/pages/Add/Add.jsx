import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image,setImage] =useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    category:"Salad",
    price:"",
  })

  //create the data change function
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  //create the API call function

  const onSubmitHandler = async (event)=>{
    event.preventDefault(); // this is use for when we press the add button reload the page the details are erase so use preventDefault for stop the reload

    //then we update the form data
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price)) // use Number for convert string to number
    formData.append("category",data.category)
    formData.append("image",image)
    //api call using axios
    const response = await axios.post(`${url}/api/food/add`,formData) // this is the url of pass the form data ${url}/api/food/add
    if(response.data.success){
      setData({
        name:"",
        description:"",
        category:"Salad",
        price:"",
      })
      setImage(false) //in this case if the data is successfully add an refresh the data

      //tost notification in successful
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    console.log(data);
  },[data])

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" className="">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category}name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} min="0" value={data.price} type="number" name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add