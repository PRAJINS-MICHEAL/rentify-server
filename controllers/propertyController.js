const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Property = require("../models/propertyModel")

const upload = asyncHandler(async (req , res )=>{

    const userId = req.user.id;

    const { name , place , district , state , country , area , bedroom , washroom , facilities , image } = req.body;

    if(!name || !place || !district || !state || !country || !area || !bedroom || !washroom || !facilities || !image)
    {
        res.status(401).json("All data are mandatory");
        throw new Error("All data are mandatory");
    }
    
    const property = await Property.create({
        userId,
        name,
        place,
        district,
        state,
        country,
        area,
        bedroom,
        washroom,
        facilities,
        image,
        likes:0
    })

    if(!property)
    {
        res.status(500).json("Internal server error.")
        throw new Error("Internal Server Error");
    }
    else
    {
        console.log("Uploaded successfully");
        res.status(201).json(property);
    }
})


const viewById = asyncHandler(async (req , res )=>{

    try
    {
        const userId = req.user.id;

        const properties = await Property.find({userId:userId})
    
        res.status(201).json(properties);
    }
    catch(err)
    {
        res.status(500);
        throw new Error("Internal Server Error.")
    }


})

const deleteProperty = asyncHandler(async (req , res )=>{

    const userId = req.user.id ;

    const {propertyUserId , propertyId} = req.body ;

    console.log(req.body)

    if(userId != propertyUserId)
    {
        res.status(401).json("Unauthorized");
        throw new Error("User not allowed to delete");
    }

    try
    {
        const property = await Property.deleteOne({_id:propertyId});
        res.status(201).json(property);

    }
    catch(err)
    {
        res.status(500).json("Internal Server Error");
    }

})

const update = asyncHandler(async (req , res )=>{

    const userId = req.user.id;

    const { propertyUserId , propertyId} = req.body ;

    if(userId != propertyUserId)
    {
        res.status(401).json("Unauthorized");
        throw new Error("User not allowed to delete");
    }

    const { name , place , district , state , country , area , bedroom , washroom , facilities , image ,likes} = req.body;

    if(!name || !place || !district || !state || !country || !area || !bedroom || !washroom || !facilities || !image)
    {
        res.status(401).json("All data are mandatory");
        throw new Error("All data are mandatory");
    }

    const deletedProperty = await Property.deleteOne({_id:propertyId})
    
    const property = await Property.create({
        userId,
        name,
        place,
        district,
        state,
        country,
        area,
        bedroom,
        washroom,
        facilities,
        image,
        likes
    })

    if(!property)
    {
        res.status(500).json("Internal server error.")
        throw new Error("Internal Server Error");
    }
    else
    {
        console.log("Updated successfully");
        res.status(201).json(property);
    }
})

const viewAll = asyncHandler(async (req , res )=>{

    try
    {
        const properties = await Property.find()
    
        res.status(201).json(properties);
    }
    catch(err)
    {
        res.status(500);
        throw new Error("Internal Server Error.")
    }

})

module.exports={ upload  , viewById , deleteProperty , update , viewAll}