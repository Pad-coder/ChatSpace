import userModel from "../models/userModel.js";
import hash from "../encryption/hash.js";
import jwt from "../encryption/jwt.js";

const signup = async(req,res)=>{
    try{
        const {name,username,email,password} = req.body;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailRegex.test(email)){
            return res.status(400).send({message:"Invalid email"});
            }
            const existingUser = await userModel.findOne({username});
            if(existingUser){
                return res.status(400).send({message:"Username already exists"});
            }
            const existingEmail = await userModel.findOne({email});
            if(existingEmail){
                return res.status(400).send({message:"Email already exists"});
            }
            if(password.length < 6){
                return res.status(400).send({message:"Password must be at least 6 characters long"});
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
              res.status(201).send({message:"User created successfully",
                name:user.name,
                username:user.username,
                email:user.email,
                follwers:user.follwers,
                following:user.following,
                profile:user.profile,
                coverimg:user.coverimg
                ,token})
            }else{
                res.status(400).send({message:"Failed to create user"})
            }


    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).send({
            message: error.message || "Intrenal Server Error"
        })
    }
}

const login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).send({message:"Please enter both username and password"})
        }
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(400).send({message:"Invalid username"})
        }
        const isValidPassword = await hash.hashCompare(password,user.password);
        if(!isValidPassword){
            return res.status(400).send({message:"Invalid password"})
            }
            
           let token = jwt.createToken(user._id,res)
           res.status(200).send({message:"User logged in successfully",
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
            followers:user.followers,
            following:user.following,
            profile:user.profile,
            coverimg:user.coverimg
            ,token
        })
    }catch(error){
        res.status(500).send({
            message: error.message || "Intrenal Server Error"
        })
    }
}

const logout = async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).send({message:"User logged out successfully"})

    }catch(error){
        res.status(500).send({
            message: error.message || "Intrenal Server Error"
            })
    }
}

const getUser = async (req,res)=>{
    try{
        const user = await userModel.findById(req.user.id).select("-password")
        res.status(200).send(user)
        
    }catch(error){
        res.status(500).send({
            message: error.message || "Internal Server Error"
            })
    }
}

export default{
    signup,
    login,
    logout,
    getUser
}