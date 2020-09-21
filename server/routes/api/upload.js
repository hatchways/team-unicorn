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
      cb(null, file.originalname)
    },
  }),
})

//@POST api/upload
//DESC: posts a profile picture to aws bucket
//should probably validate file first before uploading (basic file regex? *.png or *.jpg)
router.post('/', upload.single('profile'), (req, res, next) => {
  res.status(200).send(req.file);
})

module.exports = router;