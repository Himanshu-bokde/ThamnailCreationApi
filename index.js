const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client,PutObjectCommand , ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3");
require("dotenv").config();

console.log("SSSSSSSS", process.env.AWS_REGION)

const s3Client = new S3Client({
    region:  process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function putObject(filename,contentType) {
     const command = new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:`/upload/user-upload/${filename}`,
        ContentType:contentType
     })

    //  const url = getSignedUrl(s3Client,command,{expiresIn:60})


     const url = getSignedUrl(s3Client,command);

     return url;
}

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
}


async function listObject() {
    const command = new ListObjectsV2Command({
        Bucket:process.env.AWS_BUCKET_NAME,
        key:'/'
    })

    const result = await s3Client.send(command);
    console.log(command)

}

async function deleteObject(){
    const cmd = new DeleteObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:'/upload/user-upload/image-1764165523573.jpeg'
    })

     await s3Client.send(cmd);
}

(async () => {
    // console.log("URL for beach.jpg:", await getObjectURL("/upload/user-upload/image-1764165523573.jpeg"));

    //   console.log("URL for uploading", await putObject(`image-${Date.now()}.jpeg`,"image/jpeg"));

    // listObject()

    deleteObject()

})();
