import React, { useState, useEffect } from 'react'
import   '../styles.css'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { Link } from 'react-router-dom'
import { getAllProducts } from './helper/coreapicalls'



const Home=()=>{
     
    const [products ,setProducts] =useState([]);
    const [error ,setError] =useState(false);

    const loadAllProducts =()=>{
       getAllProducts()
       .then( data=>{
          if(data.error){
            setError(true);
          }
          else{
            setProducts(data);
          }
       })
       .catch(err=> console.log(err)) ;
    }
   useEffect(()=>{
     loadAllProducts() ;
   } ,[])




 return( 
     <div>
       <Base 
       title="Tshirt Store"
       description="Amazing place to buy Tshirts"
       
       > 
        <div className="row text-center">
        <h1 className="text-white">All Tshirts</h1>
       <div className="row  text-center">
         
         {products.map((product ,index)=>{
            return(
                <div key={index}className="col-md-3 mb-4">
                  <Card product={product}/>
                </div>
            )
         })}
        
       </div>
       </div>
       </Base>
       
      
     </div>
     
     
    
 )
}

export  default Home ;