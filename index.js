const express=require("express");
const app=express();

var bodyParser = require('body-parser');
const mongoose=require("mongoose");
// const helmet=require("helmet");
const morgan=require("morgan");
const dotenv=require("dotenv");
 const cors =require('cors');
const multer=require("multer");
const userRoute=require("./routes/users");
const authUser=require("./routes/auth");
const postRoute=require("./routes/posts");
const conversationRoute= require("./routes/conversation")
const messageRoute= require("./routes/message")
const path=require("path");


// helmet({
//   crossOriginResourcePolicy: false,
// })
dotenv.config({path:".env"})

   mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>
  {
      console.log("Database connected!")
  }).catch((err)=>
  {
    console.log(`${err}`);
  })


app.use("/images",express.static(path.join(__dirname,"/assets/images")))
//middle wares

 app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,"/assets/images"));
  },
  filename:(req,file,cb)=>{
  cb(null,req.body.name);
  }
})
const upload =multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
     return res.status(200).json("File Uploaded successfully !");
  }
  catch(err)
  {
     console.log(err);
  }
})

app.use("/api/posts",postRoute);
app.use("/api/auth",authUser);
app.use("/api/users",userRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/message",messageRoute);

// ------- Deploy ho jae bas -----
  const __dirname1=path.resolve();

 if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/build")));

 app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// jab woh url hai hi nhi
app.use((req,res)=>{
   res.status(404).json({
     error:"bad request"
   })
   
})
const PORT=process.env.PORT || 4000;
const server= app.listen(PORT,()=>
{
    console.log(`Backend is running at 4000`)
})

const io=require("socket.io")(server,{
  cors:{
      origin:process.env.PORT
  }
});

let users=[];
const addUser=(userId,socketId)=>
{
  !users.some((user)=>user.userId===userId)&&(users.push({userId,socketId}));
}
const removeUser=(socketId)=>
{
users=users.filter((user)=>user.socketId!==socketId);
// agar koi user jiski yeh socketid nhi hai jopass ki gyi hai toh ushse filter kar do hatt do baaki ko daal do
}

const getUser= (userId)=>
{
  return users.find(user=>user.userId===userId);
}

io.on("connection",(socket)=>{
  //when connect
  console.log("User connected !")
 // take user id and socket id from user
 socket.on("addUser",userId=>
 {
   addUser(userId,socket.id);
   //server to client
   io.emit("getUser",users);
   //event name = getUser
 });

 //send and get message
  socket.on("sendMessage",({senderId,receiverId,text})=>
  {
   const user=getUser(receiverId);
   io.to(user?.socketId).emit("getMessage",{
      senderId,
      text
   })
  })

 // when disconnected
 socket.on("disconnect",()=>
{
  console.log("user disconnected");
  removeUser(socket.id);
  io.emit("getUser",users);
})
})

