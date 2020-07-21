
var express = require('express')
const { check } = require('express-validator');
var router = express.Router()  
const {signout ,signup ,signin } = require('../controllers/auth.js') 

router.get("/signout" , signout);

router.post("/signin" ,[
     
    check('email').isEmail().withMessage("enter a valid  email")   ,
    check('password').isLength({min:4}).withMessage("password should be  at least 4 characters")
], signin) ;

// router.get("/test" ,  isSignedIn, (req,res)=>{
//      res.json({
//          hii: "mita"
//      })
// })

router.post("/signup" ,[
    check("name").isLength({min:3}) .withMessage("name must be at least 3 characters") ,
    check('email').isEmail().withMessage("enter a valid  email") ,
    check('password').isLength({min:4}).withMessage("password should be  at least 4 characters")
], signup) ;





module.exports =router ;