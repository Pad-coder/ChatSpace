import auth from 'bcryptjs'
import 'dotenv/config.js'


const hashPassword = async(password)=>{
    try{
            const salt = await auth.genSalt(Number(process.env.SALT))
            const hashedPassword = await auth.hash(password, salt)
            return hashedPassword
    }catch(error){
        throw error
    }
}

const hashCompare = async(password,hashedPassword)=>{
    try{
        return await auth.compare(password,hashedPassword)
    }catch(error){
        throw error
    }
}

export default {
    hashPassword,
    hashCompare
}