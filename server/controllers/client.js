const Client = require("../models/client");
const Counters = require("../models/counters");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { sendEmail } = require("../helpers/index");

exports.userById = (req, res, next, id) => {
  Client.findById(id)
    .select("")
    .exec((err, client) => {
      if (err || !client) {
        return res.status(400).json({
          error: "Client not found",
        });
      }
      req.profile = client;

      next();
    });
};

exports.readClient = (req, res) => {
  return res.json(req.profile);
};

exports.newClient = async (req, res) => {
  Client.findOne({ guardianemail: req.body.guardianemail })
    .then((clientExists) => {
      if (clientExists) {
        return res.status(403).json({ error: "Email is taken!" });
      } else {
        return Counters.findOneAndUpdate(
          { _id: "61bef528db72318bcf1b3ae5" },
          { $inc: { clientCounter: 1 } },
          { new: true }
        ).then((count) => {
          const newUser = {
            guardianfName: req.body.guardianfName,
            guardianlName: req.body.guardianlName,
            guardianemail: req.body.guardianemail,
            guardianphone: req.body.guardianphone,
            clientNumber: count.clientCounter,
          };
          const client = new Client(newUser);

          const token = {
            activeToken: jwt.sign(
              { _id: client._id, iss: "liveinangels" },
              process.env.JWT_SECRET
            ),
          };

          const id = client._id;

          const emailData = {
            from: "diveboatemployment@gmail.com",
            to: req.body.guardianemail,
            subject: "Welcome to Business",
            text: `
Hello, ${req.body.guardianfName} ${req.body.guardianlName},
Thank you for your interest in becoming a client of Business.
Please use the following link to complete our registration form: ${process.env.SERVER_URL}/clients/form/?token=${token.activeToken}`,
            html: `<p>Hello, ${req.body.guardianfName} ${req.body.guardianlName} <br/>
Thank you for your interest in becoming a client of " Business"</br>
 Please use the following link to complete our registration form:</p><a href=${process.env.SERVER_URL}/clients/form/?token=${token.activeToken}&_id=${id}>Click Here</a>`,
          };
          _.extend(client, token).save();
          sendEmail(emailData)
            .then((success) => {
              res
                .status(200)
                .json(
                  "Thank you for your interest, please check your emails to complete verification"
                );
              console.log("Success");
            })
            .catch((err) => {
              Client.findOneAndDelete({ guardianemail: req.body.guardianemail })
                .then(() => {
                  res.status(500).json({ error: "Error try again" });
                })
                .catch((error) => {
                  console.log(error);
                });
              console.log("Error sending email", error);
            });
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

  Client.findById(id)
    .select("activeToken")
    .exec((err, client) => {
      if (err || !client) {
        return res.status(400).json({
          error: err,
        });
      }
      if (token === client.activeToken) {
        return Client.findByIdAndUpdate(id, { $set: { verified: true } }).exec(
          (err, result) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            } else {
              let now = new Date();
              now.setTime(now.getTime() + 30 * 60 * 1000);
              res
                .status(301)
                .cookie("clientToken", token, { expires: now })
                .cookie("id", id, { expires: now })
                .redirect(`${process.env.CLIENT_URL}/client/form/`);
            }
          }
        );
      } else {
        res.status(500).json("Not Authorized");
      }
    });
};

exports.updateClient = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "file could not be uploaded",
      });
    }
    let client = req.profile;
    client = _.extend(client, fields);
    client.updated = Date.now();

    client.save((err, client) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(client);
    });
  });
};

exports.updateNotes = (req, res) => {
  console.log(req.body);
  const remove = req.body.action;
  const value = req.body.note;

  switch (req.body.name) {
    case "personalCare":
      Client.findByIdAndUpdate(
        req.body.clientId,
        !remove
          ? { $push: { personalCare: value } }
          : { $pull: { personalCare: value } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          res.json(result);
        }
      });
      break;
    case "houseDuties":
      Client.findByIdAndUpdate(
        req.body.clientId,
        !remove
          ? { $push: { houseDuties: value } }
          : { $pull: { houseDuties: value } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          res.json(result);
        }
      });
      break;
    case "shopping":
      Client.findByIdAndUpdate(
        req.body.clientId,
        !remove
          ? { $push: { shopping: value } }
          : { $pull: { shopping: value } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          res.json(result);
        }
      });
      break;
    case "outings":
      Client.findByIdAndUpdate(
        req.body.clientId,
        !remove ? { $push: { outings: value } } : { $pull: { outings: value } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          res.json(result);
        }
      });
      break;
    case "manualHandling":
      Client.findByIdAndUpdate(
        req.body.clientId,
        !remove
          ? { $push: { manualHandling: value } }
          : { $pull: { manualHandling: value } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          res.json(result);
        }
      });
      break;
    case "other":
      Client.findByIdAndUpdate(
        req.body.clientId,
        !remove ? { $push: { other: value } } : { $pull: { other: value } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          res.json(result);
        }
      });
      break;
  }
};
