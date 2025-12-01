
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand,PutObjectCommand , ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3");

const s3Client = require('../config/s3.config')
require("dotenv").config({ path: "./.env" });

async function putObject(filename,contentType) {
     const command = new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:`${filename}`,
        ContentType:contentType
     })

    const url = getSignedUrl(s3Client,command,{expiresIn:60})
     return url;
}

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_THAMNAILBUCKET_NAME,
        Key: `thumb-${key}`
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
}


module.exports = {
    putObject,getObjectURL
}