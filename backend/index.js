require('dotenv').config();
const express=require('express');
const app=express();
const PORT=4000;
const mongoose=require('mongoose');
const cors=require('cors');
const cloudinary=require('cloudinary')

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_DB);

const Sponsor= mongoose.model("Sponsor",{
    id:{
        type:Number,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    link1:{
        type:String,
    },
     link2:{
        type:String,
    },
     link3:{
        type:String,
    },
   
})

//API for creating the sponsor

app.post('/addsponsor',async(req,res)=>{
    const sponsors= await Sponsor.find({})
    let id;
    if(sponsors.length>0){
    const last_sponsor_array=sponsors.slice(-1);
    const last_sponsor= last_sponsor_array[0];
    id=last_sponsor.id+1
}

else{
    id=1;
}

const sponsor =new Sponsor({
    id:id,
    company_name:req.body.company_name,
    category:req.body.category,
    email:req.body.email,
    link1:req.body.link1,
    link2:req.body.link2,
    link3:req.body.link3,
})

console.log(sponsor)

await sponsor.save();
console.log("saved")

res.json({
    success:true,
    company_name:req.body.company_name
})

});

//API for deleting the sponsor

app.post('/removesponsor',async(req,res)=>{
    await Sponsor.findOneAndDelete({id:req.body.id});
    console.log("Removed");

    res.json({
        success:true,
        company_name:req.body.company_name
    })
})

//API for getting all products

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Port is running at ${PORT}`)
    }
    else{
        console.log(error);
    }

})