
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
const { ResultWithContext } = require('express-validator/src/chain');




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
    // successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}),function(req,res,next) {
    if(req.session.oldUrl){
        res.redirect(req.session.oldUrl);
        console.log(req.session.oldUrl)
        res.session.oldUrl=null;
    }else{
        res.redirect('/user/profile')
    }
});
  

  
router.get('/signin',(req,res,next)=>{
    var messages=req.flash('error');
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,title:'Sign In'});
});
  
router.post('/signin',passport.authenticate('local.signin',{
    // successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true

}),function(req,res,next) {
    if(req.session.oldUrl){
        res.redirect(req.session.oldUrl);
        console.log(req.session.oldUrl)
        res.session.oldUrl=null;
    }else{
        res.redirect('/user/profile')
    }
});




module.exports = router;


function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl=req.url;
    res.redirect('/user/signin');
}

function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/products');
}