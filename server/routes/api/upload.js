const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require('multer')
const multerS3 = require('multer-s3')


const s3 = new AWS.S3({
  accessKeyId: process.env.IAMUSERKEY,
  secretAccessKey: process.env.IAMUSERSECRET,
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKETNAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      console.log('file is uploading')
      cb(null, Date.now().toString())
    },
  }),
})

// //@route POST api/upload
// //@desc: posts a profile picture to aws bucket
// //@accesss private
// router.post('/', upload.single('profile'), (req, res, next) => {
//   res.status(200).send(req.file);
// })



// //@route GET api/upload
// //@desc: get a profile picture from aws bucket
// //@accesss private
// router.get('/', (req, res, next) => {
//   s3.getObject({Bucket: process.env.BUCKETNAME, Key: "download.png"}, (err, data) => {
//     if (err) {
//       return res.send({"error": err})
//     }
//     res.send({data})
//   })
// })
module.exports = upload;