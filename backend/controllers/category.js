const Category = require('../models/category')

exports.getCategoryById=(req,res,next ,id)=>
{ 
     Category.findById(id).exec((err,cate)=>{
            if(err)
            {
                res.status(400).json({
                    error: "CATEGORY NOT IN DB"
                })
            }
            req.category = cate ;
            next();
     })

    
}

exports.createCategory=(req,res)=>{

    const category = new  Category(req.body);
    category.save((err,cate)=>{
        if(err)
        {
            res.status(400).json({
                error: "can not create category in db"
            })
        }

        res.json(cate) ;
    })
}

exports.getCategory=(req,res)=>{

     return res.json(req.category);
}
exports.getAllCategory=(req,res)=>{
     Category.find().exec((err,items)=>{
        if(err)
        {
            res.status(400).json({
                error: "NO CATEGORY IN DB"
            })
        }
        res.json(items);
     })
     
}

exports.updateCategory=(req,res)=>{

     const category =req.category ;
     category.name =req.body.name ;
     console.log(category.name) ;
     category.save((err,updatedC)=>{
        if(err)
        {
            res.status(400).json({
                error: "NOt UPDATED"
            })
        }
        res.json(updatedC);
     })


}
exports.removeCategory=(req,res)=>{

   const category = req.category ;
   category.remove((err, removedCategory )=>{
    if(err)
    {
        res.status(400).json({
            error: "NOt ABLE TO REMOVE "
        })
    }
    res.json({
        message: "succesfully removed "
    })
   });


}