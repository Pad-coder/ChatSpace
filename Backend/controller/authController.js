import userModel from "../models/userModel.js";
import hash from "../encryption/hash.js";
import jwt from "../encryption/jwt.js";

const signup = async(req,res)=>{
    try{
        const {name,username,email,password} = req.body;
        if(!email || !name || !username || !password)
            return res.status(400).json({error:"Please fill all the fields"});
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email"});
            }
            const existingUser = await userModel.findOne({username});
            if(existingUser){
                return res.status(400).json({error:"Username already exists"});
            }
            const existingEmail = await userModel.findOne({email});
            if(existingEmail){
                return res.status(400).json({error:"Email already exists"});
            }
            if(password.length < 6){
                return res.status(400).json({error:"Password must be at least 6 characters long"});
            }
            const hashedpassword = await hash.hashPassword(password)
            const user = new userModel({
                name,
                username,
                email,
                password:hashedpassword

            })
            if(user){
              
              let token = jwt.createToken(user._id,res);

              await user.save()
              res.status(201).json({message:"User created successfully",
                name:user.name,
                username:user.username,
                email:user.email,
                followers:user.followers,
                following:user.following,
                profile:user.profile,
                coverimg:user.coverimg
                ,token})
            }else{
                res.status(400).json({message:"Failed to create user"})
            }


    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            error: "Intrenal Server Error"
        })
    }
}

const login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({error:"Please enter both username and password"})
        }
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(400).json({error:"Invalid username"})
        }
        const isValidPassword = await hash.hashCompare(password,user?.password || "");

        if(!user || !isValidPassword){
            return res.status(400).json({error:"Invalid username and password"})
            }
            
           let token = jwt.createToken(user._id,res)

           res.status(200).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
            followers:user.followers,
            following:user.following,
            profile:user.profile,
            coverimg:user.coverimg
            
        })
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({
            error: "Intrenal Server Error"
        })
    }
}

const logout = async(req,res)=>{
    try{
        res.clearCookie("jwt",);
        res.status(200).json({message:"User logged out successfully"})
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            error: "Intrenal Server Error"
            })
    }
}

const getUser = async (req,res)=>{
    try{
        const user = await userModel.findById(req.user.id).select("-password")
        res.status(200).json(user)
        
    }catch(error){
        res.status(500).json({
            error :"Internal Server Error"
            })
    }
}

export default{
    signup,
    login,
    logout,
    getUser
}