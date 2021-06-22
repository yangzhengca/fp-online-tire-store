function authRole(role) {
    return (req,res,next)=>{
        if(req.user.role !== role){
            return res.render('user/profile',{email:req.user.email,id:req.user._id,firstName:req.user.firstName,avatarPath:req.user.avatarPath,lastName:req.user.lastName,address:req.user.address,city:req.user.city,province:req.user.province,postalCode:req.user.postalCode});
        }
        next()
    }
}


module.exports={
    authRole
}