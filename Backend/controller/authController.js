

const signup = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).send({
            message: error.message || "Intrenal Server Error"
        })
    }
}

const login = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).send({
            message: error.message || "Intrenal Server Error"
        })
    }
}

const logout = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).send({
            message: error.message || "Intrenal Server Error"
            })
    }
}

export default{
    signup,
    login,
    logout
}