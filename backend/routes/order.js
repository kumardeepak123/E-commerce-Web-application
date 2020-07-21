const express =require('express') ;
const router =express.Router() ;

const {isAuthenticated , isSignedIn ,isAdmin} = require('../controllers/auth');
const { getUserById ,pushOrderInPurchaseList } = require('../controllers/user');
const { getOrderById  ,createOrder ,getAllOrders ,getOrderstatus ,updateStatus} = require('../controllers/order');
const { updateStock } = require('../controllers/product');



//PARAMS
router.param("userId" , getUserById) ;
router.param("orderId" , getOrderById) ;





//ROUTES
router.post("/order/create/:userId" ,isSignedIn ,isAuthenticated , pushOrderInPurchaseList , updateStock , createOrder ) ;

router.get("/order/all/:userId" ,isSignedIn ,isAuthenticated , isAdmin  , getAllOrders ) ;
router.get("/order/status/:userId" ,isSignedIn ,isAuthenticated , isAdmin  , getOrderstatus ) ;
router.put("/order/:orderId/status/:userId" ,isSignedIn ,isAuthenticated , isAdmin  , updateStatus ) ;





module.exports =router ;
