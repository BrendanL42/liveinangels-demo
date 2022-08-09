const Carer = require("../models/carer");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { sendEmail } = require("../helpers/index");
const moment = require("moment");
require("dotenv").config();

exports.userById = (req, res, next, id) => {
  Carer.findById(id)

    .select(
      " rosters email photo fName lName phone gender address state suburb ausCitizen postcode city age car visaDetails workersComp language emergencyName emergencyNumber emergencyEmail emergencyRelationship aboutMe nationality hobbieOne hobbieTwo hobbieThree hobbieFour medical monday tuesday wednesday thursday friday saturday sunday refereeNameOne refereeNameTwo refereeNameThree refereePhoneOne refereePhoneTwo refereePhoneThree refereePhoneThree refereeEmailOne refereeEmailTwo refereeEmailThree refereeEmailThree refereeRelOne refereeRelTwo refereeRelThree"
    )
    .exec((err, carer) => {
      if (err || !carer) {
        return res.status(400).json({
          error: "Carer not found",
        });
      }
      req.profile = carer;

      next();
    });
};
exports.updateData = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "file could not be uploaded",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    } else if (files.wwc) {
      user.wwc.data = fs.readFileSync(files.wwc.path);
      user.wwc.contentType = files.wwc.type;
    } else if (files.policeCheck) {
      user.policeCheck.data = fs.readFileSync(files.policeCheck.path);
      user.policeCheck.contentType = files.policeCheck.type;
    } else if (files.firstAid) {
      user.firstAid.data = fs.readFileSync(files.firstAid.path);
      user.firstAid.contentType = files.firstAid.type;
    } else if (files.cpr) {
      user.cpr.data = fs.readFileSync(files.cpr.path);
      user.cpr.contentType = files.cpr.type;
    } else if (files.cv) {
      user.cv.data = fs.readFileSync(files.cv.path);
      user.cv.contentType = files.cv.type;
    } else if (files.certOne) {
      user.certOne.data = fs.readFileSync(files.certOne.path);
      user.certOne.contentType = files.certOne.type;
    } else if (files.certTwo) {
      user.certTwo.data = fs.readFileSync(files.certTwo.path);
      user.certTwo.contentType = files.certTwo.type;
    } else if (files.certThree) {
      user.certThree.data = fs.readFileSync(files.certThree.path);
      user.certThree.contentType = files.certThree.type;
    } else if (files.certFour) {
      user.certFour.data = fs.readFileSync(files.certFour.path);
      user.certFour.contentType = files.certFour.type;
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(user);
    });
  });
};
exports.getDocs = (req, res, next) => {
  if (req.query.title === "wwc") {
    res.set(("Content-Type", req.profile.wwc.contentType));
    return res.send(req.profile.wwc.data);
  } else if (req.query.title === "policeCheck") {
    res.set(("Content-Type", req.profile.policeCheck.contentType));
    return res.send(req.profile.policeCheck.data);
  } else if (req.query.title === "firstAid") {
    res.set(("Content-Type", req.profile.firstAid.contentType));
    return res.send(req.profile.firstAid.data);
  } else if (req.query.title === "cpr") {
    res.set(("Content-Type", req.profile.cpr.contentType));
    return res.send(req.profile.cpr.data);
  } else if (req.query.title === "certOne") {
    res.set(("Content-Type", req.profile.certOne.contentType));
    return res.send(req.profile.certOne.data);
  } else if (req.query.title === "certTwo") {
    res.set(("Content-Type", req.profile.certTwo.contentType));
    return res.send(req.profile.certTwo.data);
  } else if (req.query.title === "certThree") {
    res.set(("Content-Type", req.profile.certThree.contentType));
    return res.send(req.profile.certThree.data);
  } else if (req.query.title === "certFour") {
    res.set(("Content-Type", req.profile.certFour.contentType));
    return res.send(req.profile.certFour.data);
  }
};
exports.getUser = (req, res) => {
  return res.json(req.profile);
};
exports.getCarer = (req, res, nexts) => {
  const carerId = req.profile._id;
  Carer.findById(carerId).exec((err, posts) => {
    if (err) {
      return res.status(400).json("Opps something went wrong");
    } else {
      return res.status(200).json(posts);
    }
  });
};
exports.getAllDocs = (req, res, next) => {
  switch (req.query.type) {
    case "cv":
      res.status(200).send(req.profile.cv.data);
      break;
    case "wwc":
      res.status(200).send(req.profile.wwc.data);
      break;
    case "pc":
      res.status(200).send(req.profile.policeCheck.data);
      break;
    case "cpr":
      res.status(200).send(req.profile.cpr.data);
      break;
    case "fa":
      res.status(200).send(req.profile.firstAid.data);
      break;
    case "c1":
      res.status(200).send(req.profile.certOne.data);
      break;
    case "c2":
      res.status(200).send(req.profile.certTwo.data);
      break;
    case "c3":
      res.status(200).send(req.profile.certThree.data);
      break;
    case "c4":
      res.status(200).send(req.profile.certFour.data);
      break;
  }
};
exports.submitRoster = (req, res, next) => {
  Carer.findOne({ _id: req.body.carerIDL })

    .then((result) => {
      if (result.carerNumber === parseInt(req.body.carerIDS)) {
        return Carer.findOneAndUpdate(
          { _id: req.body.carerIDL },
          {
            $set: {
              [`rosters.$[outer].km`]: req.body.km,
            },
          },
          {
            arrayFilters: [{ "outer.match": req.body.rosterMatch }],
          }
        )
          .then((result) => {
            const roster = result.rosters.find(
              (o) => o.match.toString() === req.body.rosterMatch.toString()
            );
            const from = moment(roster.from).format("DD/MM/YY");
            const to = moment(roster.to).format("DD/MM/YY");

            const emailData = {
              from: "diveboatemployment@gmail.com",
              to: "katjenner09@gmail.com",
              // to: "brendanlittle42@gmail.com",
              subject: `${req.profile.fName}${" "}${
                req.profile.lName
              } has submitted ${req.body.km}km for roster ${from} - ${to} `,
              text: `#${req.body.carerIDS}${" "}${req.profile.fName}${
                req.profile.lName
              } has submitted ${req.body.km}km Reimbursement approx: $${
                req.body.amount
              } `,

              html: `<p>#${req.body.carerIDS}${" "}${req.profile.fName}${" "}${
                req.profile.lName
              } has submitted ${req.body.km}km for roster <a href= ${
                process.env.CLIENT_URL
              }/carer/${
                req.body.carerIDL
              }>${from} - ${to}</a> <br/> Reimbursement is approx: $${
                req.body.amount
              } </p>`,
            };

            if (sendEmail(emailData)) {
              res.status(200).json("success");
            } else {
              res.status(500).json({ error: err });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else {
        return res.status(401).json({
          error: "Unauthorized, your not meant to be here.... go away!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
