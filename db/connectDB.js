const mongoose = require('mongoose');

const connectDB = async () => {
    try 
    {
        const connect = await mongoose.connect(process.env.DB_URI);
        console.log('DB connected :', connect.connection.name);
    } 
    catch (error) 
    {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;