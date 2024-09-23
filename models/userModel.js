import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    fullName : {type :String},
    email : {type: String},
    password : {type : String},
    createOn : {type: Date, default : new Date().getTime()},
    admin : {type : Boolean, default : false},
    role : {type : String,}
})

const User = mongoose.model("User", userSchema)
export default User