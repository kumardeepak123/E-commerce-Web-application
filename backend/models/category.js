
const mongoose =require('mongoose') ;

const CategorySchema = new mongoose.Schema({
 
    name :{
        type: String ,
        maxlength:30 ,
        unique: true ,
        required: true ,
        trim: true
    }

});


module.exports =  mongoose.model("Category" , CategorySchema)