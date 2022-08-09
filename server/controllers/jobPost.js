const Carers = require("../models/carer");
const JobPost = require("../models/jobPost");
const Counters = require("../models/counters");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { sendEmail } = require("../helpers/index");

exports.jobById = (req, res, next, id) => {
  const postID = req.params.jobid;

  JobPost.findById(postID).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: "post not found",
      });
    }
    req.profile = post;
    next();
  });
};

exports.getJobPosts = (req, res) => {
  JobPost.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json("Opps something went wrong");
    } else {
      return res.status(200).json(posts);
    }
  });
};

exports.apply = (req, res) => {



  const emailData2 = {
    from: "diveboatemployment@gmail.com",
    to: req.body.email,
    subject: "We have received your interest !",
    text: `
  Hello, ${req.body.fName} ${req.body.lName},
  Thank you for applying to the Carers job with id of # ${req.body.applications.map(
    (a) => a.jobPostId
  )}`,
    html: `<p>Hello, ${req.body.fName} ${req.body.lName} <br/>
  Thank you for applying to the Carers job with id of # ${req.body.applications.map(
    (a) => a.jobPostId
  )} `,
  };

  let titleJob = "";
  const postId = req.body.applications.map((a) => a.jobPost);

  Carers.findOne(
    { email: req.body.email },
    { fName: req.body.fName },
    { lName: req.body.lName }
  )
    .exec((err, carer) => {
      if (carer) {
        return Carers.findByIdAndUpdate(carer._id, {
          $push: {
            applications: {
              jobPostId: postId.toString(),
            },
          },
        }).exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else if(req.body.page === "/aboutus"){
            res.json("You have already applied using this email address");
          } else {
            sendEmail(emailData2).then((result) => {
              res.json("Thank you for applying, we will be in touch soon");
            }).catch((err) => {
              res.json("Error, something went wrong");
            })
          } 
        });
      } else {
    
        return Counters.findOneAndUpdate(
          { _id: "61bef528db72318bcf1b3ae5" },
          { $inc: { count: 1 } },
          { new: true }
        ).then((count) => {
          const newUser = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            phone: req.body.phone,
            carerNumber: count.count,
          };
          let carer = new Carers(newUser);
          const token = {
            activeToken: jwt.sign(
              { _id: carer._id, iss: "business" },
              process.env.JWT_SECRET
            ),
          };
          const id = carer._id;

          const emailData = {
            from: "diveboatemployment@gmail.com",
            to: req.body.email,
            subject: "Welcome to Business",
            text: `
        Hello, ${req.body.fName} ${req.body.lName},
        Thank you for your interest in working with  Business
        Please use the following link to complete our application form: ${process.env.SERVER_URL}/form/?token=${token.activeToken}`,
            html: `<p>Hello, ${req.body.fName} ${req.body.lName} <br/>
        Thank you for your interest in working with " Business"</br>
         Please use the following link to complete our application form:</p><a href=${process.env.SERVER_URL}/form/?token=${token.activeToken}&_id=${id}>Click Here</a>`,
          };
          _.extend(carer, token).save();
          sendEmail(emailData)
          res
            .status(200)
            .json(
              "Thank you for your interest, please check your emails to complete verification"
            );
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.form = (req, res, next) => {
  const id = req.query._id;
  const token = req.query.token;
  Carers.findById(id)
    .select("activeToken")
    .exec((err, carer) => {
      if (err || !carer) {
        return res.status(400).json({
          error: err,
        });
      }
      if (token === carer.activeToken) {
        return Carers.findByIdAndUpdate(id, { $set: { verified: true } }).exec(
          (err, result) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            } else {
              let now = new Date();
              now.setTime(now.getTime() + 60 * 60 * 1000);
              res
                .status(301)
                .cookie("carerFormToken", token, { expires: now })
                .cookie("id", id, { expires: now })
                .redirect(`${process.env.CLIENT_URL}/form`);
            }
          }
        );
      } else {
        res.status(500).json("Not Authorized");
      }
    });
};

exports.getSingleJobPost = (req, res, nexts) => {
  const postID = req.profile._id;
  JobPost.findById(postID).exec((err, posts) => {
    if (err) {
      return res.status(400).json("Opps something went wrong");
    } else {
      return res.status(200).json(posts);
    }
  });
};
