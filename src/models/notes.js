const mongoose=require("mongoose");

const noteSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        //to refer the userid created by mongodb when we creates the user
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requires: true
    }
},{timestamp:true});

//----???
module.exports=mongoose.model("Note", noteSchema);