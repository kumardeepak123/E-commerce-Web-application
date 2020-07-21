import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from './helper/paymentBhelper';
import { createOrder } from './helper/OrderHelper'
import { cartEmpty, loadCart } from './helper/CardHelper';
import DropIn from 'braintree-web-drop-in-react';
import { isAuthenticated } from '../auth/helper';


const  PaymentB  = ({products ,setReload = f => f  , reload= undefined }) => {

    const [info , setInfo] = useState({
        loading:false ,
        success:false ,
        clientToken:null ,
        error:"",
        instance:{}
    })
   
    const userId = isAuthenticated() &&  isAuthenticated().user._id;
    const token =  isAuthenticated()&& isAuthenticated().token ;

    const getToken =(userId,token)=>{
        getMeToken(userId ,token) 
        .then(info=>{
            console.log("INFORMATION" , info) ;
            if(info.err)
            {
                setInfo({...info ,error:info.error})
            }
            else{
                const clientToken =info.clientToken ;
                setInfo({clientToken})
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getToken(userId , token) 
    },[])
   const  showDropin=()=>{
       return(<div>
           {info.clientToken!==null && products.length >0 ? (
               <div>
                   <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button  className="btn btn-success btn-block"onClick={onPurchase}>Buy</button>
               </div>
           ) : (<h3>please login or add something to cart </h3>)}
       </div>)
   }
   const onPurchase=()=>{
    setInfo({loading:true})
    let nonce;
    let getNonce= info.instance
           .requestPaymentMethod()
           .then(data=>{
               nonce= data.nonce 
               const paymentData={
                   paymentMethodNonce:nonce ,
                   amount: getAmount()
               }
               processPayment(userId ,token, paymentData)
               .then(data=>{
                   console.log("PAYMENT SUCCESS")
                   setInfo({...info ,success:data.success ,loading:false})
                   const orderData={
                       products:products ,
                       transaction_id: data.transaction.id,
                       amount: data.transaction.amount
                   }
                   createOrder(userId ,token ,orderData)
                   cartEmpty(()=>{
                       console.log("DID APP CRASH")
                   })
                   setReload(!reload)
               })
               .catch(error=>{
                console.log("PAYMENT FAILED")
                   
                   setInfo({success:false ,loading:false})
               })
           })
           
   }
   const getAmount =()=>{
     let amout =0 ;
     products.map((p)=>{
       amout=amout+p.price ;
     })
     return amout ;
}

    return ( 
        <div>
            <h3 className="text-white">Your bill is{getAmount()}$</h3>
            {showDropin()}
        </div>
    );
}
 
export default  PaymentB ;
