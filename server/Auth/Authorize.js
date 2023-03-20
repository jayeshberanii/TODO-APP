const jwt=require('jsonwebtoken')

const Authorize=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        res.status(401).json({msg:"not Authorized"})
    }
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decoded.user
        next()
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}
module.exports=Authorize