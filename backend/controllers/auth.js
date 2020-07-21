  const User = require('../models/user')
  var expressjwt = require('express-jwt');
  var jwt =require('jsonwebtoken');
  const { body, validationResult } = require('express-validator');
  const { response } = require('express');
// SIGN OUT
exports.signout =(req ,res)=>{

   res.send("sign out succesfully ");
  }
//SIGN UP 
   exports.signup=(req,res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
      }
      const user =new User(req.body) ;
      user.save((err ,user)=>{
        if(err)
        {
           return  res.status(400).json({
                 err:"not able to connect to DB"
           });
        }

        res.json({
           'name': user.name ,
           "email":user.email ,
           "id":user._id 
        })
      });
        
   }
//SIGN  IN
   exports.signin =(req,res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
      }
      
      const {email ,password} =req.body ;

      User.findOne({email} ,(err ,user)=>{
          if(err ||!user)
          {
             return res.status(401).json({
                error:"mail not exit"
             })
          }

          if(!user.authenticate(password)){

         return   res.status(401).json({
               error: "password not matched" 
            })
         }
         //CREATE TOKEN
         const token = jwt.sign({_id:user._id} , process.env.SECRET) ;
          res.cookie("token",token,{expire: new Date()+9999}) ;
          
          const {email,name ,_id ,role} =user ;

          return res.json({token , user:{email ,name ,_id ,role}}) ;


      }) 

   };
//PROTECTED ROUTES
exports.isSignedIn= expressjwt({
   secret :process.env.SECRET ,
   userProperty:"auth"
});

//CUSTOM MIDDLE WARES 
exports.isAuthenticated=(req,res,next)=>{
 const checker = req.profile&& req.auth&& req.profile._id == req.auth._id ;
 if(!checker)
 {
     res.status(403).json({
        err:"ACCES DENIED ji"
     });
 }
   next() ;
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role ===0) 
    {
        res.status(403).json({
           err:" you are not an admin"
        });
    }
  
     next() ;
  }






