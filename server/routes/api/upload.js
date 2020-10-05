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

module.exports = upload;