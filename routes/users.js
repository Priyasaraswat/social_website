const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// const dummmyUsers =require("../dummydata")

//update user
/*router.get("/:id",async (req,res)=>
{
  let idd=req.params.id;
  let newid=idd.trim();
  let newwid=newid.toString()
    User.findById(newwid)
    .then(result=>
      {
        res.status(200).json({result})
      })  
      .catch(err=>
        {
          console.log(err);
          res.status(500).json("error");
        }) 
})
*/
router.put("/:id", async (req, res) => {
  // console.log(req.params.id);
  let reqId = req.params.id.trim();

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  User.findOneAndUpdate(
     { _id: reqId },
    {
      $set: {
        // _id:req.body._id,
        username: req.body.username,
        email: req.body.email,
        profilePhoto: req.body.profilePhoto,
        coverPhoto: req.body.coverPhoto,
          followers: req.body.followers,
          following: req.body.following,
        birthdayDay:req.body. birthdayDay,
        birthdayMonth:req.body. birthdayMonth,
        desc: req.body.desc,
        city: req.body.city,
        from: req.body.from,
        relationship: req.body.relationship,
        password: req.body.password,
      },
    }
  )
    .then((re) => {
      res.status(200).json("Account Updated");
    })
    .catch((err) => {
      res.status(500).json("ko");
      console.log(err);
    });
});

// delete user
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
// get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username =req.query.username;
  try {
    const user =userId ?
     await User.findById(userId)
     : await User.findOne({username : username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
});
// get all users from mongodb
router.get("/getAllUser",async(req,res)=>
{
  try{
     const result= await User.find();
     res.status(200).json(result);
  }
  catch(err)
  {
    res.status(500).json({ err });
    console.log(err);
  }
})
// get user according to query ie. uername
router.get("/getUserAccToQuery/", async(req,res)=>
{
  try{
        const {q}= req.query;
        console.log(q);
       
        q? res.json(Object.values(dummmyUsers).filter(user=>user.username.toLowerCase().includes(q))):res.json(dummmyUsers.slice(0,10));
  }
  catch(err)
  {
   console.log(err);
  }
})
// get friends
router.get("/friends/:userId" ,async (req,res)=>
{
   try{
      const user= await User.findById(req.params.userId);
      // promise.all is used to fetch all the friends data 
      const friends = await Promise.all(
        user.following.map(friendId=>{
            return User.findById(friendId);
        })
      )
      let friendList=[];
      friends.map(friend=>
        {
          const {_id,username,profilePhoto}=friend;
          friendList.push({_id,username,profilePhoto});
        })
        res.status(200).json(friendList);
   }
   catch(err)
   {
     res.status(500).json(err);
   }
})
// follow a user
router.put("/:id/follow", async (req, res) => {
  // let reqId = req.params.id.trim();
  if ( req.params.id !== req.body.userId) {
    try {
      const user = await User.findById( req.params.id);
      const currentUser = await User.findById( req.body.userId);

      if (!user.followers.includes( req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed !");
      } else {
        res.status(403).json("You can't follow this again again");
      }
    } catch (err) {
      console.log(req.params.id);
      console.log(req.body._id);
      res.status(500).json({ error: err });
      console.log(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
// unfollow user
router.put("/:id/unfollow", async (req, res) => {
  // let reqId = req.params.id.trim();
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User has been unfollowed !");
      } 
    
     else {
         res.status(403).json("You can't unfollow whom you have not followed");
      }
    } catch (err) {
      console.log(req.params.id);
      console.log(req.body._id);
      res.status(500).json({ error: err });
      console.log(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});
module.exports = router;
