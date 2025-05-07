const isAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(401).json({msg:"Not auntheticated"})
}
module.exports={isAuthenticated}