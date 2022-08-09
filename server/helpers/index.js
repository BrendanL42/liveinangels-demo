const nodeMailer = require("nodemailer");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
require("dotenv").config();

exports.sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "diveboatemployment@gmail.com",
      pass: "bwldeqdvqfmbjmuh",
    },
  });
  return transporter.sendMail(emailData);
  // .then(info => console.log(`$Message sent: ${info.response}`))
  // .catch(err => console.log(`$Problem sending email: ${err}`))
};

const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_ACCESS_KEY;
const BUCKETNAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

exports.s3UploadDelete = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    const file = fs.readFileSync(files.photo.path);
    const fileName = path.basename(files.photo.path);

    const params = {
      Bucket: BUCKETNAME,
      Key: fileName, // File name you want to save as in S3
      Body: file,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      res.status(200).json(data.Location);

      if (fields.oldUrl) {
        const _params = {
          Bucket: BUCKETNAME,
          Key: fields.oldUrl, // File name you want to delete as in S3
        };

        s3.deleteObject(_params, function (err, data) {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
};

exports.s3BatchDelete = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Error could not delete",
      });
    }
    if (fields.url) {
      const _params = {
        Bucket: BUCKETNAME,
        Key: fields.url, // File name you want to delete as in S3
      };

      s3.deleteObject(_params, function (err, data) {
        if (err) {
          throw err;
        }
        res.status(200).json("success");
      });
    }
  });
};
