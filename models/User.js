const mongoose=require("mongoose");
const UserSchema =new mongoose.Schema({
     _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePhoto:{
        type:String,
        default:""
    },
    coverPhoto:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    // isAdmin: {
    //     type:Boolean,
    //     default:false
    // },
    birthdayDay:{
          type:String
    },
    birthdayMonth:{
        type:String
  },
    desc:{
        type:String
    },
    city:{
        type:String
    },
    from:{
        type:String,
    },
    relationship:{
        type:String
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("User",UserSchema);