const mongoose=require("mongoose")
const hostelManagement=new mongoose.Schema(
    {
    
       Roll_Number:{type:String,required:true},
       Block:{type:String,required:true,enum:["A","B","C","D"]},
       Room_Number:{type:String,required:true},
       Name:{type:String,required:true},
       Complaint_Type:{type:String,required:true},
       Description:{type:String,required:true},
       Phone_Number:{type:Number,required:true},
       Status:{type:String,default:"Pending",enum:["Pending","Resolved"]}


    }
);


module.exports=mongoose.model("hms",hostelManagement)