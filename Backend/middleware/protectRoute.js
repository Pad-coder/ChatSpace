import userModel from "../models/userModel.js";
import jwtoken from "jsonwebtoken";

export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        
        if(!token) {return res.status(401).json({success:false,
            message:"Please login to access this resource"});
        }
        const decoded = jwtoken.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({error:
                "Unauthorized: Invalid Token"});
        }
        
        const user = await userModel.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error:
                "Unauthorized: User not found"});
        }
        req.user = user;
        next()

    }catch(error){
        console.log("Error in protectRoute Middleware", error.message)
      return res.status(500).json({message: error.message})
    }
}