
var express = require('express');
var router = express.Router();
var User=require('../models/user');
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
        console.log(req.body)
        res.redirect('/user/profile')
    }
});

//modify profile
router.get('/:id',isLoggedIn,getUser,async (req,res,next)=>{
    try{
        res.render('user/edit-profile',{selectedUser:res.selectedUser,csrfToken:req.csrfToken(),title:"Edit profile"})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

// update user profile
router.post('/edit/:id',isLoggedIn,getUser,async(req,res)=>{
    res.selectedUser.email=req.body.email;
    res.selectedUser.firstName=req.body.firstName;
    res.selectedUser.lastName=req.body.lastName;
    res.selectedUser.address=req.body.address;
    res.selectedUser.city=req.body.city;
    res.selectedUser.province=req.body.province;
    res.selectedUser.postalCode=req.body.postalCode;
    res.selectedUser.avatarPath=req.body.avatarPath;
    try{
        const updatedUser=await res.selectedUser.save()
        res.redirect('/user/profile');
    }catch(err){
        res.status(400).json({message:err.message})
    }
})



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

// function- get user by id
async function getUser(req,res,next){
    let selectedUser 
    try{
        selectedUser =await User.findById(req.params.id);
      if(selectedUser ==null){
        return res.status(404).json({message:"Can not find user"});
    }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.selectedUser=selectedUser ;
    next()
  }
