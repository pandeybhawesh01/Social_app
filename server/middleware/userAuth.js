import jwt from 'jsonwebtoken';

const userAuth= async(req, res,next)=>{
    const {token} = req.cookies;
    if(!token)
    {
        return res.json({success:false, message:'Not autherized,Login Again'})
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
         console.log("Token received:", tokenDecode);

        if(tokenDecode.id){
            req.userId= tokenDecode.id;
        }
        else{
            return res.json({success:false, message:'Not Autherized. Login Again'})
        }
        next()
    }
    catch(error){
        console.log("Token received:", token);
        res.json({success:false, mesage: error.mesage})
    }
}

export default userAuth;