const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

dotenv.config();
//parse the req body in json
app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Max 100 requests per window per IP
  message: "Too many requests from this IP, please try again later.",
});

app.use(globalLimiter);


//-----??????-----
app.use(cors());


const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
app.use("/user", userRouter);
app.use("/note", noteRouter);

//defining a middleware
// app.use((req,res,next)=>{
//     console.log("HTTP method  "+req.method+" , URL "+req.url);
//     next();
// });

app.get("/", (req, res) => {
  res.send("NOTES API");
});

const PORT = process.env.PORT || 5000;
//connecting database

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started at port number " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// -------------------------------------------------
// mongoose.set("strictQuery", false);
// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB database connected");
//   } catch (error) {
//     console.log("MongoDB database not connected");
//   }
// };
