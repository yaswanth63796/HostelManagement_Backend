const express=require("express")
const cors=require("cors");
const mongoose=require("mongoose")
const app=express()
const PORT=5000
app.use(cors())//middleware
app.use(express.json())


mongoose.connect("mongodb+srv://yeshuv312:yaswanth@cluster0.qc4ruwm.mongodb.net/Hostel_mangement?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("DB connected");
}).catch((err)=>console.log(err));


const hms=require("./model/HostelManagement")

//get student complaints by id

app.get("/api/students/complaints/:rollNumber", async (req, res) => {
  try {
    const { rollNumber } = req.params;

    const complaint = await hms.findOne({ Roll_Number: rollNumber });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post details
app.post("/api/students/complaints",async(req,res)=>
{
    try{
        const{Roll_Number,Block,Room_Number,Name,Complaint_Type,Description,Phone_Number}=req.body
        const complaint=new hms({Roll_Number,Block,Room_Number,Name,Complaint_Type,Description,Phone_Number})
        await complaint.save()
        res.status(201).json(complaint)
    }
     catch(error)
    {
        res.status(500).json({message:error.message})
    }

})



//get all details

app.get("/api/students/complaints",async(req,res)=>
{
    try
    {
        const complaints=await hms.find()
        res.json(complaints)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

//delete a complaint

app.delete("/api/students/complaints/:id",async(req,res)=>
{
    try{
const complaints=await hms.findByIdAndDelete(req.params.id)
if(!complaints)
{
return res.status(400).json({message:"Complaints Not found!!"})
}
res.json({message:"complaints deleted!"})
    }


catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

//get the complaints by warden

app.get("/api/warden/complaints/:block",async(req,res)=>
{
   try
   {
    const {block}=req.params;
    const complaint=await hms.find({Block:block});
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

   

})


//edit the status by warden
app.put("/api/warden/complaints/:id",async(req,res)=>
{
    try
    {
const {Status}=req.body;
const updated=await hms.findByIdAndUpdate(req.params.id,{Status},{new:true})
   if(!updated)
        {
return res.status(404).json({message:"Complaints not found"})
        }
        res.json(updated)
    }


    
catch(error)
{
    res.status(500).json({message:error.message})
}

})


app.listen(PORT,()=>
{
    console.log("Server is running ")
})