const Order = require("../models/order");
const Cart = require("../models/cart");
//import passport
var passport=require('passport');

function authRole(role) {
    return (req,res,next)=>{
        if(req.user.role !== role){
              
            return res.redirect('noright')
        
        }    
        next()
    }
}


module.exports={
    authRole
}