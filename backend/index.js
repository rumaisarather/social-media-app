const express= require("express");
const app= express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const commentsRoute = require("./routes/comments");

  const cors =require("cors");
 const multer= require("multer");
 const path = require("path");
 
    
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    {
        console.log("Connected to mongoDB");
    }

    app.use("/images",express.static(path.join(__dirname, "public/assets/images")));

    // MIDDLEWARE
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("common"));
    // app.use(express.static('public',{maxAge:86400000}));

    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, "public/assets/images");
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name);
          },
    });
    const upload = multer({storage:storage});
    app.post("/api/upload",upload.single("file"),(req,res)=>{
        try{
return res.status(200).json("File uploaded successfuly.");
        }catch(err){
            console.log(err)
        }
    })

    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/posts", postRoute);
    app.use("/api/conversations", conversationRoute);
    app.use("/api/messages", messageRoute);
    app.use("/api/comments",commentsRoute);

           
    app.get('/',(req,res)=>{
        res.setHeader('Content-Type','application/json');
         const jsonData = {message:'hello'};
         res.json(jsonData);
    });

app.listen(5000,()=>{
    console.log("backend server is running successfully");
});