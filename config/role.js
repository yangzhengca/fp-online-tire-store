const Order = require("../models/order");
const Cart = require("../models/cart");
//import passport
var passport=require('passport');

function authRole(role) {
    return (req,res,next)=>{
        if(req.user.role !== role){
            Order.find({user:req.user}),function(err,orders){
                console.log(orders)
                if(err){
                    return res.write('Error!');
                }
                var cart;
                orders.forEach(function(order){
                    cart =new Cart(order.cart);
                    order.items=cart.generateArray();
                });
            }
            return res.render('user/profile',{orders:orders,email:req.user.email,id:req.user._id,firstName:req.user.firstName,avatarPath:req.user.avatarPath,lastName:req.user.lastName,address:req.user.address,city:req.user.city,province:req.user.province,postalCode:req.user.postalCode});

            // {orders:orders,email:req.user.email,id:req.user._id,firstName:req.user.firstName,avatarPath:req.user.avatarPath,lastName:req.user.lastName,address:req.user.address,city:req.user.city,province:req.user.province,postalCode:req.user.postalCode});
        }
        next()
    }
}


module.exports={
    authRole
}