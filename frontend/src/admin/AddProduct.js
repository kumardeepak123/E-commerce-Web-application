
import React, { useState, useEffect }  from 'react';
import Base  from '../core/Base'
import { Link } from 'react-router-dom';
import { getAllCategories, createProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';



const  AddProduct = () => {
   
     const [values ,setValues]= useState({
         productName:"",
         description:"",
         price:"",
         stock:"",
         photo:"",
         category:"",
         categories:[],
         loading:false,
         error:"",
         createdProduct:"",
         getARedirect:"",
         formData:""
     })
     const {user ,token} = isAuthenticated() ;
  const {productName ,description ,price ,stock , categories ,category ,createdProduct ,error ,loading,getARedirect ,formData }=values ;

    const onSubmit =(event)=>{
       event.preventDefault() ;
       console.log(formData);
       setValues({...values ,error: false ,loading: true }) ;
       createProduct(user._id ,token , formData) 
       .then( data=>{
            console.log(data) ;
           if(data.error)
           {
               setValues({...values ,error: data.error })
           }else{
                
                setValues({...values , productName:"" ,description:"" ,loading: false ,price:"" ,photo:"" ,stock:"" ,createdProduct: data.productName})
           }
       })
       .catch(err=> console.log(err)) ;
    }
    const handleChange =name=> event=>{
      const value = name ==="photo"? event.target.files[0]: event.target.value ;
      formData.set( name ,value );
      setValues({...values , [name]: value}) ;
    }
    const preLoad=()=>{
        getAllCategories()
        .then(data=>{
            if(data.error)
            {
                setValues({...values ,error:data.error});
            }
            else{
                 setValues({...values ,categories:data  , formData: new FormData()});
                 console.log(data) ;
                 
            }
            
        })
        .catch(err=>console.log(err)) ;
    }
     useEffect(()=>{
        preLoad() ;
     },[]);
     const successMessage=()=>{
        return(
            <div className="alert alert-success mt-3" style={{display : createdProduct? "" : "none" }}>
                <h4>{createdProduct} created successfully</h4>
            </div>
        )
     }
     const errorMessage=()=>{
        return(
            <div className="alert alert-danger mt-3" style={{display : error? "" : "none" }}>
                <h4>failed to create product </h4>
            </div>
        )
    }
    const createProductForm = () => (
        <form  >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <span>Product Name</span>
          <div className="form-group">
            <input
              onChange={handleChange("productName")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={productName}
            />
          </div>
          <span>Description</span>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <span>Price</span>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <span>Category</span>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
               {categories && categories.map((m ,index)=>{
                    return <option  key={index} value={m._id}>{m.name}</option>
               })}
              
            </select>
          </div>
          <span>Stock</span>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return (
            <Base  title= "Add product here!"   description="Welcome to Product Creation Section" className="container bg-info py-4 mb-4 px-4">
             <Link to="/admin/dashboard" className="  btn btn-md btn-dark mb-3">Admin Home</Link>
              <div className="row bg-dark text-white rounded">
                  <div className="col-md-8 offset-md-2">
                     {successMessage()}
                     {errorMessage()} 
                    {createProductForm()}
                  </div>
              </div>  
            </Base>
    );
}
 
export default  AddProduct;