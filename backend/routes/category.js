
const express =require('express')

const router =express.Router()
const {isAuthenticated , isSignedIn ,isAdmin } = require('../controllers/auth');
const {getUserById} =require('../controllers/user')
const {getCategoryById ,createCategory ,getCategory ,getAllCategory,updateCategory,removeCategory} =require('../controllers/category') 



// PARAMS 
router.param("userId" , getUserById) ;
router.param("categoryId" , getCategoryById) ;


//ROUTES
router.post("/category/create/:userId" ,isSignedIn ,isAuthenticated,isAdmin , createCategory);
router.get("/category/:categoryId"  , getCategory);
router.get("/categories" , getAllCategory);
router.put("/category/:categoryId/:userId" ,isSignedIn ,isAuthenticated,isAdmin , updateCategory);
router.delete("/category/:categoryId/:userId" ,isSignedIn ,isAuthenticated,isAdmin , removeCategory) ;








module.exports =router ;
