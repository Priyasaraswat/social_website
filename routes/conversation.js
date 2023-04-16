const router = require("express").Router();
const Conversation= require("../models/Conversation");

// new conversation
router.post("/" ,async (req,res)=>
{
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    });
    // our schema is created and the value to be added are also added
    try{
         const savedConversation =await newConversation.save();
         res.status(200).json(savedConversation);
    }
    catch(err)
    {
        // 500 means error inside server or mongodb
    res.status(500).json(err);
    }
})

//get conversation of user
router.get("/:userId",async(req,res)=>
{
    try
    {
     const conversation = await Conversation.find({
        members:{
        $in:[req.params.userId]
     }})
     res.status(200).json(conversation);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
// get conversation using two user id
router.get("/find/:firstuserId/:secondUserId", async (req,res)=>
{
    try{
     const conversation =await Conversation.findOne({
        members:{$all:[req.params.firstuserId,req.params.secondUserId]}
        

     })
     res.status(200).json(conversation);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
module.exports= router;