const mongoose = require("mongoose")

const userModel = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true 
        },
        lastName:{
            type:String,
            required:true 
        },
        email:{
            type:String,
            required:true ,
            unique:true 
        },
        phone:{
            type:String,
            required:true 
        },
        password:{
            type:String,
            required:true 
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("User",userModel);