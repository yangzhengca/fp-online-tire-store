var express = require('express');
const cart = require('../models/cart');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');
const keys=require('../config/keys');

//import passport
var passport=require('passport');

//import csrf
var csrf=require('csurf');
var csrfProtection=csrf();
router.use(csrfProtection);

//import auth role
const {authRole}=require('../config/role');

// create new product page
router.get('/create',isLoggedIn,authRole('admin'),(req,res)=>{
    res.render('admin/create',{csrfToken:req.csrfToken(),title:'Create a new product'});
})

//get all products
router.get('/dashboard',isLoggedIn,authRole('admin'),async(req,res)=>{
    try{
        const products=await Product.find();
        res.render('admin/dashboard',{products:products,csrfToken:req.csrfToken(),title:'Admin Dashboard'})
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// deleting one
router.get('/delete/:id',isLoggedIn,authRole('admin'),getProduct,async (req,res)=>{
    try{
        await res.product.remove();
        res.redirect('/admin/dashboard');
    }catch(err){
        res.status(500).json({message:err.message})
    }
})



//create one
router.post('/create',isLoggedIn,authRole('admin'),async(req,res)=>{
    // console.log(req.body)
    const product=new Product({
        imagePath:req.body.imagePath,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        width:req.body.width,
        aspectRatio:req.body.aspectRatio,
        diameter:req.body.diameter,
        inStock:req.body.inStock
    });
    try{
        const newProduct=await product.save();
        res.redirect('/admin/dashboard');
        // res.status(201).json(newProduct)
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

//edit page
router.get('/edit/:id',isLoggedIn,authRole('admin'),getProduct,async (req,res)=>{
    
    try{
        res.render('admin/edit',{product:res.product,csrfToken:req.csrfToken(),title:"Edit product"})
    }catch(err){
        res.status(400).json({message:err.message})
    }
});

//update one
router.post('/edit/:id',isLoggedIn,authRole('admin'),getProduct,async(req,res)=>{
    res.product.imagePath=req.body.imagePath;
    res.product.title=req.body.title;
    res.product.description=req.body.description;
    res.product.price=req.body.price;
    res.product.width=req.body.width;
    res.product.aspectRatio=req.body.aspectRatio;
    res.product.diameter=req.body.diameter;
    res.product.inStock=req.body.inStock;
    try{
        const updatedProduct=await res.product.save()
        res.redirect('/admin/dashboard');
    }catch(err){
        res.status(400).json({message:err.message})
    }
})






// function- get item by id
async function getProduct(req,res,next){
    let product 
    try{
      product=await Product.findById(req.params.id);
      if(product==null){
        return res.status(404).json({message:"Can not find subscriber"});
    }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.product=product;
    next()
  }




module.exports = router;



function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/products');
}

function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/products');
}