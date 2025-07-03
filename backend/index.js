require("dotenv").config(); 
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mongoose = require('mongoose');
const PORT=4000;
const app = express();
const cors=require('cors');
const path=require('path');

app.use(express.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for temporary file storage
const upload = multer({ dest: 'uploads/' });

// MongoDB connection
mongoose.connect(process.env.MONGO_DB);

// Sponsor model
const Sponsor = mongoose.model("Sponsor", {
  id: {
    type: Number,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  phoneNumber: {  // Added phone number field
    type: String,
    required: true
  },
  logo_url: {  // Added logo URL field
    type: String,
  },
  link1: {
    type: String,
  },
  link2: {
    type: String,
  },
  link3: {
    type: String,
  },
});

// Combined API for creating sponsor with logo upload
app.post('/addsponsor', upload.single('logo'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Generate new sponsor ID
    const sponsors = await Sponsor.find({});
    let id;
    if (sponsors.length > 0) {
      const last_sponsor_array = sponsors.slice(-1);
      const last_sponsor = last_sponsor_array[0];
      id = last_sponsor.id + 1;
    } else {
      id = 1;
    }

    let logo_url = null;
    
    // Upload logo to Cloudinary if file exists
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        logo_url = result.secure_url;
        
        // Delete temporary file
        fs.unlinkSync(req.file.path);
      } catch (uploadErr) {
        console.error('Cloudinary upload failed:', uploadErr);
        // Continue without logo if upload fails
      }
    }

    // Create new sponsor
    const sponsor = new Sponsor({
      id: id,
      company_name: req.body.name,
      category: req.body.category1, 
      phoneNumber: req.body.phoneNumber,
      logo_url: logo_url,
      link1: req.body.facebook,
      link2: req.body.twitter,
      link3: req.body.instagram,
    });

    console.log('Sponsor to save:', sponsor);

    await sponsor.save();
    console.log("Sponsor saved successfully");

    res.json({
      success: true,
      message: 'Sponsor added successfully',
      sponsor: {
        id: sponsor.id,
        company_name: sponsor.company_name,
        logo_url: sponsor.logo_url
      }
    });

  } catch (error) {
    console.error('Error creating sponsor:', error);
    
    // Clean up temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create sponsor: ' + error.message 
    });
  }
});

// Keep the separate upload endpoint if needed for other purposes
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    
    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
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

//API for getting top products

app.get('/topsponsor', async (req, res) => {
    try {
        const sponsors = await Sponsor.find({});
        console.log("Top sponsor fetched");
        res.send(sponsors);
    } catch (error) {
        console.error("Error fetching top sponsor:", error);
        res.status(500).send({ error: "An error occurred while fetching top sponsors" });
    }
});


app.get('/allsponsor',async(req,res)=>{
    try {
        const allsponsors=await  Sponsor.find({});
        console.log("All sponsors fetched")
        res.send(allsponsors)
    } catch (error) {
        console.error("Error fetching all sponsor:", error);
        res.status(500).send({ error: "An error occurred while fetching sponsors" });
    }
})

app.get('/:category/sponsor',async(req,res)=>{
    const {category}=req.params
    try {
        const sponsor= await Sponsor.find({category})
        console.log(`${category} is fetched`)
        res.send(sponsor)
    } catch (error) {
        res.status(500).send({error:"Ann error occurred while fetching"})
    }
})

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Port is running at ${PORT}`)
    }
    else{
        console.log(error);
    }

})