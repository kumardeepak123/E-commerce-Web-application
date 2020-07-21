
import {API} from '../../backend'
//CATEGORY CALLLS:>
//CREATE CATEGORY CALL
export const  createACategory =(userId ,token , category )=>{
     return fetch(`${API}/category/create/${userId}`,{
          method:"POST",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(category)

     }).then( res=>{ return res.json()})
     .catch(err=> console.log(err))

}
//READ CATEGORIES CALLS
export const getAllCategories =()=>{
       return fetch(`${API}/categories` ,{
            method:"GET",
           
       }).then( res=>{
             return  res.json() ;
       })
         .catch(err=> console.log(err)) ;
}
export const getACategory =( categoryId)=>{
     return fetch(`${API}/category/${categoryId}` ,{
          method:"GET",
         
     }).then( res=>{
           return  res.json() ;
     })
       .catch(err=> console.log(err)) ;
}
//UPDATE CATEGORY CALL
export const updateACategory =( categoryId ,userId ,token  ,category)=>{
     return fetch(`${API}/category/${categoryId}/${userId}` ,{
          method:"PUT",
          headers:{
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization : `Bearer ${token}`

          },
          body: JSON.stringify(category)
         
     }).then( res=>{
           return  res.json() ;
     })
       .catch(err=> console.log(err)) ;
}

//DELETE CATEGORY CALL
export const deleteACategory=(categoryId ,userId ,token)=>{
     return fetch(`${API}/category/${categoryId}/${userId}` ,{
          method:"DELETE",
          headers:{
               Accept:"application/json" ,
               "Content-Type":"application/json",
               Authorization: `Bearer ${token}`
          }
         
     }).then( res=>{
           return  res.json() ;
     })
       .catch(err=> console.log(err)) ;
}





///..............................
//PRODUCT CALLS :>

//CREATE PRODUCT
 export const createProduct =( userId ,token , product)=>{
      return fetch(`${API}/product/create/${userId}` ,{
           method:"POST",
           headers:{
               Accept:"application/json",
              
              Authorization: `Bearer ${token}`
           },
           body: product 
      }).then(res=>{
            return  res.json() ;
      })
        .catch(err=>console.log(err));

 }
//READ PRODUCT
export const getAProduct =( productId )=>{
      return fetch(`${API}/product/${productId}` ,{
           method:"GET" 
           
          
      }).then(  res=>{
            return res.json() ;
      })
        .catch( err=>console.log(err))
       
     
}

export const getAllProducts =()=>{
     return fetch(`${API}/products` ,{
          method:"GET" 
          
         
     }).then(  res=>{
          return res.json() ;
    })
      .catch( err=>console.log(err))
    
}
//UPDATE PRODUCT
export const updateProduct =( userId,token ,productId , product)=>{
     return fetch(`${API}/product/${productId}/${userId}` ,{
          method:"PUT",
          headers:{
              Accept:"application/json",
             
             Authorization: `Bearer ${token}`
          },
          body:product 
     }).then(res=>{
           return  res.json() ;
     })
       .catch(err=>console.log(err));

}

//DELETE PRODUCT
export const deleteProduct =( productId ,userId,token )=>{
     return fetch(`${API}/product/${productId}/${userId}`,{
          method:"DELETE",
          headers:{
             Accept:"application/json",
             
             Authorization:`Bearer ${token}`
          },
          
     }).then(res=>{
           return  res.json() ;
     })
       .catch(err=>console.log(err));

}
