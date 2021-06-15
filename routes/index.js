var express = require('express');
const cart = require('../models/cart');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');
const keys=require('../config/keys');

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
  res.render('shop/checkout',{total:cart.totalPrice*100, key:stripePublicKey});
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
  }))
  .then(charge=>res.render('shop/success'));
})



module.exports = router;
