const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute");


const app = express()
require("dotenv").config();
app.use(express.json())
app.use(cors());
app.use("/api/users",userRoute)

app.get("/",(req,res)=>{
    res.send("Hello from this server i am going to end this world")
})


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req,res)=>{
    console.log(`Server renning on port....: ${port}`)
})
mongoose.connect(uri).then(()=>{
    console.log("Connected to mongodb")
}).catch((error)=>{
    console.log("Connection failed : ",error.message)
})