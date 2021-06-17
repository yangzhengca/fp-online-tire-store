
var express = require('express');
var router = express.Router();

// var Product=require('../models/product');


//import passport
var passport=require('passport');

//import csrf
var csrf=require('csurf');
var csrfProtection=csrf();
router.use(csrfProtection);

//import auth role
const {authRole}=require('../config/role');




// router.get('/profile',isLoggedIn,(req,res,next)=>{
//     res.render('user/profile');
// });
router.get('/profile',isLoggedIn,authRole('admin'),(req,res,next)=>{
    res.redirect('/admin/dashboard');
});

router.get('/logout',isLoggedIn,(req,res,next)=>{
    req.logout();
    res.redirect('/');
})


router.use('/products',notLoggedIn,(req,res,next)=>{
    next();
});


router.get('/signup',(req,res,next)=>{
    var messages=req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,title:'Sign In'});
  })
  
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}));
  

  
router.get('/signin',(req,res,next)=>{
    var messages=req.flash('error');
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,title:'Sign In'});
});
  
router.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true
}));




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