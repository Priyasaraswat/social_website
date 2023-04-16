const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Register
router.post("/register", async (req, res) => {
  // const user= await new User({
  //     username:"Priya",
  //     email:"priya@gmail.com",
  //     password:"123456"
  // })
  //await user.save();
  //res.send("done");
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
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
      password: hashedPassword,
    });

    // save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
   

    res.status(200).json(user);
  } catch (err) {
    !validPassword && res.status(404).json("wrong password");
    res.status(500).json(err);
  }
});

module.exports = router;
