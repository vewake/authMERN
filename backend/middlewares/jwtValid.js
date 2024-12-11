import jwt from 'jsonwebtoken'


export const ensureAuth = (req,res,next)=>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(403)
            .json({ message: 'unauthorized, jwt token is required'})

    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(403)
            .json({ message: 'unauthorized, JWT token wrong or expired'})
    }
}