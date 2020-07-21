
const User =require('../models/user') ;
const Order =require('../models/order')




exports.getUserById=(req, res ,next ,id)=>
{
   User.findById(id).exec((err ,user)=>{
    
    if(err ||!user)
     {
         return res.status(400).json({
             err:  "NO USER FOUND IN DB"
         })
     }
      req.profile =  user ;
      next();
   })

}
exports.getUser=( req, res)=>{
      req.profile.salt= undefined ;
      req.profile .encry_password= undefined ;
      req.profile.createdAt =undefined ;
      req.profile.updatedAt =undefined ;
    return   res.json( req.profile) ;
}

exports.updateUser=( req,res)=>{
 
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set : req.body} ,
        {new :true  ,userFindAndModify: false}
        ).exec(( err ,user)=>{
                if(err || !user)
                 {
                     return res.status(403).json({
                         err: "you are not authorized to update"
                     })
                 }
                 user.salt =undefined ;
                 user.encry_password =undefined ;
                 user.createdAt=undefined ;
                 user.updatedAt =undefined ;
                 res.json(user) ;
        })
}
//  THIS METHOD HAS NOT TESTED 
exports.userPurchaseList=(req,res)=>{

    Order.find({user: req.profile._id})
    .populate("user" ,"_id name ")
    .exec((err , order)=>{
            if(err)
            {
                return res.status(400).json({
                    err: "NO ORDER IN THIS USER"
                })
            }
           return  res.json(order) ;
    })

}

//middle ware 
exports.pushOrderInPurchaseList=(req,res,next)=>{
  let purchases =[];
   req.body.order.products.forEach((product)=>{
    purchases.push({
        _id:product._id ,
        description:product.description ,
        category: product.category ,
        quantity: product.quantity ,
        amout: req.body.order.amout ,
        transaction_id: req.body.order.transaction_id
    })
    
   })
   //update in db
   User.findOneAndUpdate(
         {_id:req.profile._id} ,
         {$push :{purchases:purchases}},
         {new: true},
         (err ,user)=>{
            if(err)
            {
                return res.json({
                    err:"can't add "
                })
            }
         }
         );

    next();
}