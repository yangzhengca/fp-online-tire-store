function authRole(role) {
    return (req,res,next)=>{
        if(req.user.role !== role){
            return res.render('user/profile');
        }
        next()
    }
}


module.exports={
    authRole
}