const router=require("express").Router();
const Post=require("../models/Post")
const User = require("../models/User");
// create a post
router.post('/', async (req,res)=>
{
    const newPost=new Post(req.body);
    try{
       const savedPost =await newPost.save();
       res.status(200).json(savedPost);
    }
    catch(err)
    {
        res.status(500).json({error:err});
        console.log(err);
    }
    
   //res.send("ji");
});
// update a post
router.put("/:id",async(req,res)=>
{
    let reqId=req.params.id.trim();
    const post =await Post.findById(reqId);
   //console.log(reqId);
  post.updateOne({

    $set:{
       
        img:req.body.img,
        desc:req.body.desc,
        likes:req.body.likes
    }
    
  })
  .then(re=>{
       res.status(200).json("Account updated !"
      )
    })
    .catch(err=>
    {
      res.status(500).json("Only your account not others")
      console.log(err);
      
    })
    
});
// delete a post
router.delete("/:id",(req,res)=>
{
  Post.deleteOne({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      message:"Deleted"
    })
  })
    .catch(err=>{
        res.status(500).json({
          error:err
        })
      }) 
  })
// like a post
router.put("/:id/like",async (req,res)=>
{
  try{
    const post=await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId))
    {
        await Post.findOneAndUpdate({_id:req.params.id},{
            $set:{
              likes:req.body.userId
            }
          })
          res.status(200).json("Post liked !");
    }
    else{
        await Post.findOneAndUpdate({_id:req.params.id},{
            $pull:{
                likes:req.body.userId
            }
        })
        .then(er=>
            {
                res.status(200).json("gone");
            })
            .catch(er=>
                {
                    res.status(500).json(err);
                })
    }
  }
  catch(err){
   res.status(500).json(err);
 console.log(err);
  }
})
// get a post
router.get("/:id",async (req,res)=>
{
    try{
       const post= await Post.findById(req.params.id);
       res.status(200).json(post);
       
    }
    catch(err)
    { 
        res.status(500).json(err);
        console.log(err);
    }
})
// get user's all  posts
router.get("/profile/:username",async (req,res)=>
{
    try{
      
      const user= await User.findOne({username:req.params.username})
      const posts = await Post.find({userId:user._id});
      res.status(200).json(posts);
    }
    catch(err)
        {
            res.status(500).json(err);
            console.log(err);
        }
})

// get timeline posts
router.get("/timeline/:userId",async (req,res)=>
{
    try{
      const currentUser= await User.findById(req.params.userId);
      const userPosts=await Post.find({userId:currentUser._id});
      const friendPosts=await Promise.all(
          currentUser.following.map(friendId=>
            {
             return Post.find({userId:friendId})
            })
      )
        res.json(userPosts.concat(...friendPosts));
    }
    catch(err)
        {
            res.status(500).json(err);
            console.log(err);
        }
})

module.exports=router;