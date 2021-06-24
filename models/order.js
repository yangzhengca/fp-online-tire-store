var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var schema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    cart:{
        type:Object,
        required:true
    },
    address:{
        type:String
    },
    name:{
        type:String
    },
    paymentId:{
        type:String,
        required:true
    }
});




module.exports=mongoose.model('Order',schema);