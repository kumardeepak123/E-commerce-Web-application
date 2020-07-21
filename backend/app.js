const express = require('express') ;
const mongoose = require('mongoose');
const app =express()  ; 
require('dotenv').config() ;
const bodyParser = require('body-parser') ;
const cookieParser =require('cookie-parser') ;
const cors = require('cors') ;

const authRoute = require('./routes/auth')  ;
const userRoute = require('./routes/user')
const  categoryRoute = require('./routes/category')
const  productRoute = require('./routes/product')
const  orderRoute = require('./routes/order')
const  paymentRoute = require('./routes/paymentBroutes')






mongoose.connect( process.env.DATABASE,
 { useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex :true 
    }).then(()=>{
        console.log("DB CONNECTED") ;       
    });

//MIDDLE WARES 
 app.use(bodyParser.json())
 app.use(cookieParser())
 app.use(cors()) 

 //ROUTES 
 app.use("/api" , authRoute) ;
 app.use("/api" , userRoute) ;
 app.use("/api" , categoryRoute);
 app.use("/api" , productRoute);
 app.use("/api" , orderRoute);
 app.use("/api" , paymentRoute);


 

 const port = process.env.PORT || 8000 ;
 app.listen(port ,()=>{
     console.log("app is running on "+port+"...");
 })





