import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
        const password= encodeURIComponent(process.env.PASSWORD);
        const connect  = await  mongoose.connect(`${process.env.MONGODB_USER}${password}${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Connected to MongoDB")
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}

export default connectDb