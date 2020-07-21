const Product = require("../models/product")
const formidable =require('formidable')
const _ = require("lodash")
const fs =require("fs")
const { sortBy } = require("lodash")
const { update } = require("../models/product")
const product = require("../models/product")
const category = require("../models/category")

exports.getProductById=(req,res,next ,id)=>{
  Product.findById(id)
     .populate("category")
     .exec((err,product)=>{
            if(err)
            {
                 return res.status(400).json({
                     error:"product not found"
                 })
            }

            req.product =product ;
            next();
  })

    

}

exports.createProduct=(req,res)=>{

     let form= formidable.IncomingForm();
     form.keepExtensions =true ;
      form.parse( req,(err,fields, file)=>{
        if(err)
        {
             return res.status(400).json({
                 error:"problem  with image "
             })
        }
        const { price ,description ,category , productName ,stock}=fields ;
        if( !price ||!description||!category||!productName ||!stock) {

            return res.status(400).json({
                error:"please include all fields"
            })

        }
        const product = new Product(fields);
        if(file.photo){

             if(file.photo.size >3000000)
             {
                return res.status(400).json({
                    err:"problem  with  size of image "
                })
             }
             product.photo.data =fs.readFileSync(file.photo.path) 
             product.photo.contentType= file.photo.type 
        }
        
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    err:"cant create product "
                })
    
            }
           
            res.json(product) ;
        })

      })
}

exports.getProduct=(req,res)=>{
    req.product.photo =undefined ;
    res.json(req.product)
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data)
    {
          res.set("content-Type" , req.product.photo.contentType) ;
          return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct=(req,res)=>{
     const product =req.product ;
     product.remove((err, product)=>{
        if(err){
            return res.status(400).json({
                error:"can  deleteproduct "
            })

        }
         res.json({
             mess:"deleted succesfully",
             deletedproduct: product
         })
     })

}

exports.updateProduct=(req,res)=>{
    
    let form= formidable.IncomingForm();
    form.keepExtensions =true ;
     form.parse( req,(err,fields, file)=>{
       if(err)
       {
            return res.status(400).json({
                error:"problem  with image "
            })
       }
      
       
       let product =  req.product ;
       product= _.extend(product ,fields) 
       if(file.photo){

            if(file.photo.size >3000000)
            {
               return res.status(400).json({
                   error:"problem  with  size of image "
               })
            }
            product.photo.data =fs.readFileSync(file.photo.path) 
            product.photo.contentType= file.photo.type 
       }
       
       product.save((err,product)=>{
           if(err){
               return res.status(400).json({
                   error:"cant update  product "
               })
   
           }
          
           res.json(product) ;
       })

     })

}

exports.getAllProducts =(req,res)=>{

    const limit = req.query.limit?   parseInt(req.query.limit):8 ;
    const sortBy = req.query.sortBy ? req.query.sortBy :"_id" ;
   Product.find()
        .select("-photo")
        .sort([[sortBy ,"asc"]])
        .limit(limit)
        .exec((err,products)=>{
        if(err)
        {
            return res.status(400).json({
                error:"cant get all products"
            })
        }

        res.json(products);

   })

}

exports.updateStock=(req,res ,next)=>{
    let myOperations =req.body.order.products.map( prod=>{
        return {
              updateOne :{
                  filter:{_id :prod._id} ,
                  update:{$inc :{stock : -prod.count  ,sold : +prod.count}}
              }
        }
    })

    product.bulkWrite(myOperations ,{},(err ,products)=>{
        if(err)
        {
            return res.status(400).json({
                error:"BULK OPERATION FAILDED"
            })
        }

    })

    next();

}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category" ,{},(err,category)=>{
        if(err)
        {
            return res.status(400).json({
                error:"NO CATEGORY FOUND"
            })
        }

        res.json(category);
    })

}