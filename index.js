const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const connectDB = require("./db/connectDB")

dotenv.config();
connectDB();

const app=express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use("/users", require("./routes/userRoutes"));
app.use("/property", require("./routes/propertyRoutes"));


const port = process.env.PORT;
app.listen(port ,() => {
  console.log(`Server running on port ${port}`);
});


