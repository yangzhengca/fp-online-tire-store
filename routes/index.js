const express = require('express');
const cart = require('../models/cart');
const router = express.Router();
const Product=require('../models/product');
const Cart=require('../models/cart');
const keys=require('../config/keys');
const Order=require('../models/order');
const { session } = require('passport');
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(keys.stripeSecretKey)



//home page
router.get('/', (req, res, next)=> {
  res.render('shop/index', {title:'Home'});
});
  
//about page
router.get('/about', (req, res, next)=> {
  res.render('shop/about', {title:'About us'});
});    


//products page
router.get('/products', (req, res, next)=> {
  Product.find((err,docs)=>{
    var productChunks=[];
    var chunkSize=3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize))
    }
    res.render('shop/products', {title:'Products',products:productChunks});
  });    
});

//add to cart router
router.get('/add-to-cart/:id',(req,res,next)=>{
  var productId=req.params.id;
  var cart=new Cart(req.session.cart?req.session.cart:{items:{}});
  Product.findById(productId,(err,product)=>{
    if(err){
      return res.redirect('/products');
    }
    cart.add(product,product.id);
    req.session.cart=cart;
    // console.log(req.session.cart);
    res.redirect('/products');
  });
});

//shopping cart page router
router.get('/shopping-cart',(req,res,next)=>{
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products:null});
  }
  var cart =new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice,total:cart.totalPrice*100,key:keys.stripePublicKey,title:'Shopping Cart'});
});

//checkout page router
router.get('/checkout',(req,res,next)=>{
  if(!req.session.cart){
    return res.redirect('shopping-cart');
  }
  var cart =new Cart(req.session.cart);
  res.render('shop/checkout',{totalDisplay:cart.totalPrice,total:cart.totalPrice*100, key:keys.stripePublicKey});
});

//charge route
router.post('/charge',(req,res)=>{
  const amount=40000;

  stripe.customers.create({
    email:req.body.stripeEmail,
    source:req.body.stripeToken
  })
  .then(customer=>stripe.charges.create({
    amount,
    description:'Tires',
    currency:'usd',
    customer:customer.id
  }),
    function(err,charge){    //create a order #17
    if(err){
      req.flash('error',err.message);
      return res.redirect('/shopping-cart');
    }
    var order=new Order({
      user:req.user,
      cart:cart,
      address:req.body.address,
      name:req.body.name,
      paymentId:charge.id
    });
    order.save((err,rusult)=>{

    });} //order end here
  

  ) // syntax for charge
 
 

  .then(charge=>res.render('shop/success'));
})


//search by size route
router.post('/result',getProduct,(req,res)=>{
  console.log(res.product)
  res.render('shop/result',{product:res.product});
  
})

//must choose all size option
async function getProduct(req,res,next){
  let product 
  try{
    product=await Product.find({
      width:req.body.searchWidth,
      aspectRatio:req.body.searchAspectRatio,
      diameter:req.body.searchDiameter
    });
    
  }catch(err){
      return res.status(500).json({message:err.message});
  }
  res.product=product;
  next()
}

// add to cart from result page
router.get('/add-to-cart-from-result/:id',(req,res,next)=>{
  var productId=req.params.id;
  var cart=new Cart(req.session.cart?req.session.cart:{items:{}});
  Product.findById(productId,(err,product)=>{
    if(err){
      return res.render('shop/result',{product:req.product});
    }
    cart.add(product,product.id);
    req.session.cart=cart;
    // console.log(req.session.cart);
    res.render('shop/result',{product:product});
  });
});

router.get('/result',(req,res)=>{
  
  res.render('shop/result',{product:product})
})



//search when at least on has one size option was selected(未完成)
// async function getProduct(req,res,next){
//   let product 
//   try{
//       if(req.searchWidth!=='' && req.body.searchAspectRatio!==''&&req.body.searchDiameter!==''){
//         product=await Product.find({
//         width:req.body.searchWidth,
//         aspectRatio:req.body.searchAspectRatio,
//         diameter:req.body.searchDiameter
//       })};

//       if(product==null){
//           return res.status(404).json({message:"Can not find product in your entered tire size"});
//       }
//   }catch(err){
//       return res.status(500).json({message:err.message});
//   }
//   res.product=product;
//   next()
// }


module.exports = router;

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  req.session.oldUrl=req.url;
  res.redirect('/user/signin');
}
