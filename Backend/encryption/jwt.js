import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const createToken = (userId,res)=>{
 const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'1d'})

        res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 15*24*60*60*1000,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "Developement"
            })
}

const decodeToken = (token)=>{

        return jwt.decode(token)
}

export default{
    createToken,
    decodeToken
}