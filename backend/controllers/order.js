const  { Order ,ProductCart} = require('../models/order')


exports.getOrderById=(req,res ,next ,id)=>{
  
 Order.findById(id)
 .populate("products.product" , " productName  price")
 .exec(( err,order )=>{
       if(err)
       {
           return res.status(400).json({
               err:"can not get order by id"
           })
       }

       req.order = order ;
       next();
 })

}

exports.createOrder=(req,res)=>{
    req.body.order.user =req.profile ;
    const order = new Order(req.body.order) ;
    order.save((err ,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:"can not create order "
            })
        }
        res.json(order) ;
    })
}

exports.getAllOrders =(req,res)=>{
     Order.find()
      .populate("user", "_id name")
      .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:"can find all orders "
            })
        }
        res.json(order) ;
      })
}


exports.updateStatus=(req, res)=>{
    Order.update(
        {_id: req.order._id},
        {$set:{status : req.body.order.status}} ,
        (err , status)=>{
            if(err)
           {
            return res.status(400).json({
                err:"can not update status"
            })
          }
          res.json( status)

        }
        )

}

exports.getOrderstatus=(req, res)=>{

    res.json(Order.schema.path("status" ).enumValues) ;
    
}