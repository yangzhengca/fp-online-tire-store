var express = require('express');
const cart = require('../models/cart');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');
const keys=require('../config/keys');


//admin page

router.get('/',(req,res)=>{
    res.render('admin/admin');
})


//create one
router.post('/',async(req,res)=>{
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
        res.status(201).json(newProduct)
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

//update one




//delete one



//search





module.exports = router;