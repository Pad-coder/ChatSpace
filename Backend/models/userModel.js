import mongoose from "../MongoDb/connectDb.js";

const userShema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    profile:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    likedPosts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        default:[]
    }
],

},{
        timestamps: true,
        versionKey: false,
        collection: "User"
    })

    export default new mongoose.model("User",userShema)
   