const {putObject,getObjectURL} = require('../../utils/s3')
require("dotenv").config({ path: "./.env" });


exports.getSignUrl = async (req,res,next)=>{
    let key = `image-${Date.now()}.jpeg`;
      let result =  await putObject(key,"image/jpeg")
      res.json({ url: result , key :key });
}


exports.getDownloadUrl  = async (req,res,next)=>{
   const { key } = req.query;
   const url = await  getObjectURL(key)

  res.json({ url });
}


