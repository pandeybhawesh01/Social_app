import mongoose from "mongoose"

const followers={type:String}
const userSchema= new mongoose.Schema({
    name:{type: String, required:true},
    email: {type:String, required:true, unique:true},
    image:{type:String,default:''},
    banner:{type:String, default:''},
    password:{type:String,required:true},
    verifyOtp:{type:String,default:''},
    verifyOtpExpireAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:Number,default:0},
    bio: {type:String, default:''},
    website: {type:String, default:''},
    location:{type:String, default:''},
    followers:{type:[followers],default:[]},
    following:{type:[followers],default:[]}
})


const userModel= mongoose.models.user||mongoose.model('user',userSchema)

export default userModel