
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


//profile page route
router.get('/profile',isLoggedIn,authRole('admin'),(req,res,next)=>{
    res.redirect('/admin/dashboard');
});

//log out route
router.get('/logout',isLoggedIn,(req,res,next)=>{
    req.logout();
    res.redirect('/');
})


router.use('/products',notLoggedIn,(req,res,next)=>{
    next();
});

//sign up page route
router.get('/signup',(req,res,next)=>{
    var messages=req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,title:'Sign Up'});
  })
 
//sign up route  
router.post('/signup',passport.authenticate('local.signup',{
    // successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}),function(req,res,next) {
    if(req.session.oldUrl){
        var oldUrl=req.session.oldUrl;
        res.session.oldUrl=null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile')
    }
});
  

//sign in page route
router.get('/signin',(req,res,next)=>{
    var messages=req.flash('error');
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,title:'Sign In'});
});
  
//sign in route
router.post('/signin',passport.authenticate('local.signin',{
    // successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true

}),function(req,res,next) {
    if(req.session.oldUrl){
        var oldUrl=req.session.oldUrl;
        res.session.oldUrl=null;
        res.redirect(oldUrl);
        // console.log(req.session.oldUrl)
        
    }else{
        res.redirect('/user/profile')
    }
});




module.exports = router;

// is logged in functuon
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