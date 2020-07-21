import React ,{useEffect, useState} from 'react';
import Base from '../core/Base'
import { Link } from 'react-router-dom';
import {   getAllCategories, deleteACategory  } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';



const ManageCategories = () => {
   const {user , token} =isAuthenticated() ;

  const [categories ,setCategories] =useState([]) ;

  const preLoad=()=>{
      getAllCategories()
       .then( data=>{
           if(data.error)
           {
               console.log(data.error) ;
           }
           else{
                setCategories(data);
           }
       })
       .catch(err=> console.log(err)) ;
  } 
 
   useEffect(()=>{
        preLoad() ;
   } , [])

   const deleteThisCategory =(categoryId)=>{
           deleteACategory(categoryId ,user._id ,token)
           .then(data=>{
                if(data.error)
                {
                     console.log(data.error)
                }
                else{
                    preLoad();
                }
           })
           .catch(err=> console.log(err)) ;
   }
 


    return (
        <Base title="Welcome admin" description="Manage categories  here">
      <h2 className="mb-4">All  categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>

          { categories.map((category  ,index)=>{
          return (
            <div  key={index} className="row  text-center mb-2 ">
            <div className="col-4">
          <h3 className="text-white text-left">{category.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/category/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
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
 
export default ManageCategories;