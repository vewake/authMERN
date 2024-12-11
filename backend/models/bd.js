import mongoose from "mongoose";
 import ensureAuth from "./middlewares/jwtValid.js"


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true

    }
});

const UserModel = mongoose.model('users', UserSchema)
export default UserModel;
