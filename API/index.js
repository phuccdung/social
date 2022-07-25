const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const helmet =require("helmet");
const morgan=require("morgan");

const usersRouter= require("./routes/users");
const authRouter=require("./routes/auth");
const postRouter=require("./routes/post");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser:true,useUnifiedTopology:true},
    ()=>{
    console.log("Connect to DB");
})

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user",usersRouter);
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);


app.listen(8800,()=>{
    console.log("BE is running")
})