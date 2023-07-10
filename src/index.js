const express= require("express");
const app= express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const cors= require("cors");
dotenv.config();
//parse the req body in json
app.use(express.json());

//-----??????-----
app.use(cors());

const userRouter = require("./routes/userroutes");
const noteRouter = require("./routes/notesroutes");



app.use("/user", userRouter);
app.use("/note", noteRouter);

//defining a middleware
// app.use((req,res,next)=>{
//     console.log("HTTP method  "+req.method+" , URL "+req.url);
//     next();
// });


app.get('/',(req,res)=>{
    res.send("NOTES API");
});

const PORT= process.env.PORT || 5000;
//connecting database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started at port number "+ PORT);
    })
})
.catch((error)=>{
    console.log(error);
})

