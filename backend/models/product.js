
const mongoose = require('mongoose') ;
const {ObjectId}=mongoose.Schema ;


const productSchema = new mongoose.Schema({
  productName :{
      type: String ,
      maxlength: 30 ,
      maxlength:30 ,
      trim:true  ,
      required:true
   } ,
   description:{
    type: String ,
    maxlength: 30 ,
    maxlength:200 ,
    trim:true ,
    required:true
   },
   price:{
    type: Number ,
    maxlength: 30 ,
    maxlength:30 ,
    trim:true ,
    required:true
   } ,
   stock:{
       type: Number ,

   } ,
   sold:{
       type: Number ,
       default: 0 
   },
   category :{
        type: ObjectId ,
        ref:  "Category" ,
        required :true
   } ,
   photo:{
     data : Buffer ,
     contentType :String 
   }


} ,{timestamps: true});

module.exports =  mongoose.model("Product" , productSchema) ;