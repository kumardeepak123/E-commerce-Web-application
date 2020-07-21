var mongoose = require('mongoose') ;

const  uuidv1 = require('uuid/v1') ;
const crypto = require('crypto') ;


var    UserSchema = new mongoose.Schema({
    name :{
         type :String ,
         trim :true ,
         maxlength: 30 ,
         required:  true ,
    } ,
    lastName :{
        type: String ,
        trim:true ,
       
        maxlength: true
    },
    email :{
        type: String ,
        unique: true ,
        required: true ,
        

    } ,

    encry_password:{
          type: String ,
          required: true 
    } ,

    salt : String ,
     role:{
            type:Number ,
            default: 0
     } ,

    purchases :{
        type : Array ,
        default: [] ,

    } ,




     
} ,{timestamps : true});
 
UserSchema.virtual("password")
    .set(function(password){
        this._password =password ;
        this.salt =uuidv1() ;
        this.encry_password = this.securepassword(password);
    })
    .get(function(){
        return this._password 
    })
UserSchema.methods ={
 
    authenticate :function( plainpassword){
      
        return   this.securepassword(plainpassword)  === this.encry_password 
    } ,

    
    securepassword : function( plainpassword){
         if(!plainpassword) return "" ;
         try{
            
             return  crypto.createHmac('sha256',this.salt)
                   .update( plainpassword)
                   .digest('hex');


         }catch(err)
         {
              return "";
         }
    }

};

module.exports =  mongoose.model("User" , UserSchema) ;