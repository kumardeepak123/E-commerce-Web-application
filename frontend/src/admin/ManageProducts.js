import React ,{useEffect, useState} from 'react';
import Base from '../core/Base'
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';



const ManageProducts = () => {
   const {user , token} =isAuthenticated() ;

  const [products ,setProducts] =useState([]) ;

  const preLoad=()=>{
      getAllProducts()
       .then( data=>{
           if(data.error)
           {
               console.log(data.error) ;
           }
           else{
                setProducts(data);
                console.log(products);
           }
       })
       .catch(err=> console.log(err)) ;
  } 
   useEffect(()=>{
        preLoad() ;
   } , [])

   const deleteThisProduct =(productId)=>{
             deleteProduct(productId ,user._id , token)
             .then(data=> {
                 if(data.error)
                 {
                     console.log( data.error)
                 }else{
                     preLoad();
                 }
             })
             .catch(err=> console.log(err))
   }
 


    return (
      <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

         {products.map((product,index)=>{
            return(
              <div className="row text-center mb-2 ">
              <div className="col-4">
            <h3 className="text-white text-left">{product.productName}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            )
         })}
        </div>
      </div>
    </Base>
    );
}
 
export default ManageProducts;