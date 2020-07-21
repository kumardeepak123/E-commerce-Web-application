const { API } = require("../../backend");



export const getAllProducts =()=>{
     return fetch(`${API}/products` ,{
         method:"GET",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
         }
     }).then( data=>{
          return data.json() ;
     })
       .catch(err=> console.log(err));
}