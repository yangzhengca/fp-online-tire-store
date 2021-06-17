var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    imagePath:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    aspectRatio:{
        type:Number,
        required:true
    },
    diameter:{
        type:Number,
        required:true
    },
    inStock:{
        type:Number,
        required:true
    }
});


module.exports=mongoose.model('Product',schema)




