var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs')

var userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'basic'
    },
    date:{
        type:Date,
        default:Date.now
    },
    // add user profile
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    province:{
        type:String
    },
    postalCode:{
        type:String
    },
    avatarPath:{
        type:String
    }

});

userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword=function (password) {
    return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User',userSchema);