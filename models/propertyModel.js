const mongoose = require("mongoose")

const propertyModel = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true 
        },
        name:{
            type:String,
            required:true 
        },
        place:{
            type:String,
            required:true 
        },
        district:{
            type:String,
            required:true 
        },
        state:{
            type:String,
            required:true 
        },
        country:{
            type:String,
            required:true 
        },
        area:{
            type:Number,
            required:true 
        },
        bedroom:{
            type:Number,
            required:true 
        },
        washroom:{
            type:String,
            required:true 
        },
        facilities:{
            type:String,
            required:true 
        },
        image:{
            type:String,
            required:true 
        },
        likes:{
            type:Number,
            required:true
        }
        
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Property",propertyModel);