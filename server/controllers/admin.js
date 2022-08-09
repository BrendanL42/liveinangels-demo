const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();
const Admin = require("../models/admin");
const Blog = require("../models/blog");
const Carer = require("../models/carer");
const Client = require("../models/client");
const JobPost = require("../models/jobPost");
const formidable = require("formidable");
const { sendEmail } = require("../helpers/index");
const path = require("path");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const html = fs.readFileSync(path.join(__dirname, "./template.html"), "utf8");
const moment = require("moment");
const schedule = require("node-schedule");

const MomentRange = require("moment-range");

const moment2 = MomentRange.extendMoment(moment);

// to create admin - no client side methods
exports.signup = async (req, res, next) => {
  const userExists = await Admin.findOne({ email: req.body.email });

  if (userExists)
    return res.status(403).json({
      errs: "Email is taken!",
    });

  const user = await new Admin(req.body);

  await user.save();

  res.status(200).json({ message: "sign up success! Please login." });
};

// sign in
exports.signInAdmin = (req, res) => {
  const { email, password, rememberMe } = req.body;
  console.log({ email });
  Admin.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "Can't find you",
      });
    }

    //admin schema method
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Your email and password do not match",
      });
    }

    // generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const { _id, fName, lName, email, role } = user;

    let forgot = new Date();
    let remember = new Date();
    forgot.setTime(forgot.getTime() + 2 * 3600 * 1000);
    remember.setTime(remember.getTime() + 3600000 * 24 * 3);

    if (rememberMe) {
      res.cookie("LIA", token, { expires: remember });
      res.cookie("ID", _id, { expires: remember });
    } else {
      res.cookie("LIA", token, { expires: forgot });
      res.cookie("ID", _id, { expires: forgot });
    }

    // retrun response with user and token to frontend client

    return res.json({ token, user: { _id, email, fName, lName, role } });
  });
};

// sign out
exports.signout = (req, res) => {
  res.clearCookie("LIA");
  return res.json({ message: "Cya" });
};

// protect routes for signed in users using jsonWebToken

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.adminById = (req, res, next, id) => {
  Admin.findById(id)
    .select("role price")

    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Employer not found",
        });
      }
      req.profile = admin;
      admin.hashed_password = undefined;
      admin.salt = undefined;
      next();
    });
};

exports.hasAuthorization = (req, res, next) => {
  let adminUser = req.profile && req.auth && req.profile._id === req.auth._id;
  const authorized = adminUser;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
  next();
};

exports.newBlog = (req, res, next) => {
  let post = new Blog(req.body);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.newJob = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    let post = new JobPost(fields);
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.getCarers = async (req, res, next) => {
  Carer.find({ form: { $in: ["true", true] } }, function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      throw err;
    }
  });
};

exports.getClients = async (req, res, next) => {
  Client.find({ form: { $in: ["true", true] } }).exec((err, client) => {
    if (err || !client) {
      return res.status(400).json({
        error: "Client not found",
      });
    }
    res.json(client);

    next();
  });
};

exports.contactForm = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const preference = req.body.preference;
  const message = req.body.message;

  const emailData = {
    from: "diveboatemployment@gmail.com",
    to: "brendanlittle42@gmail.com",
    subject: "New enquiry from business",
    text: `Hi User, you have received an enquiry from ${name}, 
    ${message}.
    Phone number: ${phone}
    Email: ${email}
    They prefer to be contacted via ${preference} `,

    html: `<p>Hi User, <br/> You have received an enquiry from ${name}, <br/> 
    ${message}.<br/>
    Phone number: ${phone}<br/>
    Email: ${email}<br/>
    They prefer to be contacted via ${preference}</p>`,
  };

  await sendEmail(emailData);

  return res.status(200).json("Sent successfully");
};

exports.updateRoster = (req, res) => {
  if (req.query.type === "update") {
    const editDay = req.body.day;
    const value = req.body.valueOfEntry;
    const clientId = req.body.idClient;
    const carerId = req.body.idCarer;
    const rosterIdClient = req.body.rosterIdClient;
    const rosterIdCarer = req.body.rosterIdCarer;
    const startPerieod = req.body.time;

    Client.findOneAndUpdate(
      { _id: clientId },
      {
        $set: {
          [`rosters.$[outer].schedule.${editDay}.${startPerieod}`]: value,
          [`rosters.$[outer].${editDay}`]: value,
        },
      },
      {
        arrayFilters: [{ "outer._id": rosterIdClient }],
      }
    )
      .then(() => {
        return Carer.findOneAndUpdate(
          { _id: carerId },
          {
            $set: {
              [`rosters.$[outer].schedule.${editDay}.${startPerieod}`]: value,
              [`rosters.$[outer].${editDay}`]: value,
            },
          },
          {
            arrayFilters: [{ "outer._id": rosterIdCarer }],
          }
        );
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    let match = "";

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return (match = result);
    }

    makeid(5);

    Client.findOneAndUpdate(
      { _id: req.body.idClient },
      {
        $push: {
          rosters: {
            carer: { name: req.body.carer, id: req.body.idCarer },
            schedule: req.body.schedule,
            to: req.body.to,
            from: req.body.from,
            match: match,
            phone: req.body.phone,
            address: req.body.address,
          },
        },
      }
    )
      .then(() => {
        return Carer.findOneAndUpdate(
          { _id: req.body.idCarer },
          {
            $push: {
              rosters: {
                client: { name: req.body.client, id: req.body.idClient },
                schedule: req.body.schedule,
                phone: req.body.phone,
                address: req.body.address,
                to: req.body.to,
                from: req.body.from,
                match: match,
              },
            },
          }
        );
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

exports.deleteRoster = (req, res, next) => {
  Client.findByIdAndUpdate(
    { _id: req.body.idClient },
    {
      $pull: {
        rosters: {
          match: req.body._match,
        },
      },
    }
  )
    .then(() => {
      return Carer.findByIdAndUpdate(
        { _id: req.body.idCarer },
        {
          $pull: {
            rosters: {
              match: req.body._match,
            },
          },
        }
      );
    })
    .then((result) => {
      console.log("result", result);
      res.json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ error: err });
    });
};

const calDates = (startDate, stopDate, key) => {
  const start = new Date(startDate),
    end = new Date(stopDate);

  const range = moment2.range(moment(start), moment(end));

  switch (key) {
    case 0:
      const obj = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[0],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[0],
      ];

      return obj;
      break;

    case 1:
      const obj1 = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[1],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[1],
      ];

      return obj1;
      break;

    case 2:
      const obj2 = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[2],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[2],
      ];

      return obj2;
      break;

    case 3:
      const obj3 = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[3],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[3],
      ];

      return obj3;
      break;

    case 4:
      const obj4 = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[4],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[4],
      ];

      return obj4;
      break;

    case 5:
      const obj5 = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[5],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[5],
      ];

      return obj5;
      break;

    case 6:
      const obj6 = [
        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("ddd")
        )[6],

        Array.from(range.by("day")).map((date) =>
          moment(date._d).format("DD/MM")
        )[6],
      ];

      return obj6;
      break;
  }
};

const cal = (time1, time2) => {
  var hour1 = time1.split(":")[0];
  var hour2 = time2.split(":")[0];
  var min1 = time1.split(":")[1];
  var min2 = time2.split(":")[1];

  var diff_hour = hour2 - hour1;
  var diff_min = min2 - min1;
  if (diff_hour < 0) {
    diff_hour += 24;
  }
  if (diff_min < 0) {
    diff_min += 60;
    diff_hour--;
  } else if (diff_min >= 60) {
    diff_min -= 60;
    diff_hour++;
  }

  if (diff_hour === 0 && isNaN(diff_min)) {
    return;
  } else {
    console.log([diff_hour, "hrs", " ", diff_min, "mins"]);
    return [diff_hour, "hrs", diff_min, "mins"];
  }
};

exports.emailRoster = (req, res, next) => {
  const rosterID = req.body.rosterId;
  if (req.body.who === "carer") {
    Carer.find({ _id: req.body._carerId })
      .then((result) => {
        const thisId = result[0].rosters.find(
          (o) => o.match.toString() === rosterID.toString()
        );

        const users = {
          day1: calDates(thisId.from, thisId.to, 0),
          day2: calDates(thisId.from, thisId.to, 1),
          day3: calDates(thisId.from, thisId.to, 2),
          day4: calDates(thisId.from, thisId.to, 3),
          day5: calDates(thisId.from, thisId.to, 4),
          day6: calDates(thisId.from, thisId.to, 5),
          day7: calDates(thisId.from, thisId.to, 6),
          from: moment(thisId.from).format("DD/MM"),
          to: moment(thisId.to).format("DD/MM"),
          client: thisId.client.name,
          phone: thisId.phone,
          address: thisId.address,
          carer: `${result[0].fName}${" "}${result[0].lName}`,
          monday: {
            start: thisId.schedule.monday.start,
            finish: thisId.schedule.monday.finish,
            total: cal(
              thisId.schedule.monday.start,
              thisId.schedule.monday.finish
            ),
            notes: thisId.schedule.monday.notes,
          },

          tuesday: {
            start: thisId.schedule.tuesday.start,
            finish: thisId.schedule.tuesday.finish,
            total: cal(
              thisId.schedule.tuesday.start,
              thisId.schedule.tuesday.finish
            ),
            notes: thisId.schedule.tuesday.notes,
          },

          wednesday: {
            start: thisId.schedule.wednesday.start,
            finish: thisId.schedule.wednesday.finish,
            total: cal(
              thisId.schedule.wednesday.start,
              thisId.schedule.wednesday.finish
            ),
            notes: thisId.schedule.wednesday.notes,
          },

          thursday: {
            start: thisId.schedule.thursday.start,
            finish: thisId.schedule.thursday.finish,
            total: cal(
              thisId.schedule.thursday.start,
              thisId.schedule.thursday.finish
            ),
            notes: thisId.schedule.thursday.notes,
          },

          friday: {
            start: thisId.schedule.friday.start,
            finish: thisId.schedule.friday.finish,
            total: cal(
              thisId.schedule.friday.start,
              thisId.schedule.friday.finish
            ),
            notes: thisId.schedule.friday.notes,
          },

          saturday: {
            start: thisId.schedule.saturday.start,
            finish: thisId.schedule.saturday.finish,
            total: cal(
              thisId.schedule.saturday.start,
              thisId.schedule.saturday.finish
            ),
            notes: thisId.schedule.saturday.notes,
          },

          sunday: {
            start: thisId.schedule.sunday.start,
            finish: thisId.schedule.sunday.finish,
            total: cal(
              thisId.schedule.sunday.start,
              thisId.schedule.sunday.finish
            ),
            notes: thisId.schedule.sunday.notes,
          },
        };

        var options = {
          format: "A4",
          orientation: "landscape",
          border: "10mm",
        };

        const document = {
          html: html,
          data: {
            users: users,
          },
          path: "./output.pdf",
          type: "buffer",
        };

        return pdf.create(document, options);
      })
      .then((result) => {
        if (req.body.send) {
          const emailData = {
            from: "diveboatemployment@gmail.com",
            to: req.body.email,
            subject: "New roster",
            text: `Please see roster attached, Please use this link to submit km`,
            attachments: [
              {
                filename: "roster.pdf",
                content: new Buffer(result, "utf-8"),
              },
            ],

            html: `<p>Please see roster attached</p></br>
            <p>Please use this link to submit km for reimbursement -- <a href=${process.env.CLIENT_URL}/submit-roster?roster=${rosterID}&carer=${req.body._carerId}>Click Here</a></p>`,
          };

          sendEmail(emailData);
          return res.json("Success, email sent");
        } else {
          res.set(("Content-Type", "application/pdf"));
          return res.send(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Client.find({ _id: req.body._clientId })
      .then((result) => {
        const thisId = result[0].rosters.find(
          (o) => o.match.toString() === rosterID.toString()
        );

        const users = {
          day1: calDates(thisId.from, thisId.to, 0),
          day2: calDates(thisId.from, thisId.to, 1),
          day3: calDates(thisId.from, thisId.to, 2),
          day4: calDates(thisId.from, thisId.to, 3),
          day5: calDates(thisId.from, thisId.to, 4),
          day6: calDates(thisId.from, thisId.to, 5),
          day7: calDates(thisId.from, thisId.to, 6),
          from: moment(thisId.from).format("DD/MM"),
          to: moment(thisId.to).format("DD/MM"),
          client: `${result[0].clientfName}${" "}${result[0].clientlName}`,
          carer: thisId.carer.name,
          phone: thisId.phone,
          address: thisId.address,
          monday: {
            start: thisId.schedule.monday.start,
            finish: thisId.schedule.monday.finish,
            total: cal(
              thisId.schedule.monday.start,
              thisId.schedule.monday.finish
            ),
            notes: thisId.schedule.monday.notes,
          },

          tuesday: {
            start: thisId.schedule.tuesday.start,
            finish: thisId.schedule.tuesday.finish,
            total: cal(
              thisId.schedule.tuesday.start,
              thisId.schedule.tuesday.finish
            ),
            notes: thisId.schedule.tuesday.notes,
          },

          wednesday: {
            start: thisId.schedule.wednesday.start,
            finish: thisId.schedule.wednesday.finish,
            total: cal(
              thisId.schedule.wednesday.start,
              thisId.schedule.wednesday.finish
            ),
            notes: thisId.schedule.wednesday.notes,
          },

          thursday: {
            start: thisId.schedule.thursday.start,
            finish: thisId.schedule.thursday.finish,
            total: cal(
              thisId.schedule.thursday.start,
              thisId.schedule.thursday.finish
            ),
            notes: thisId.schedule.thursday.notes,
          },

          friday: {
            start: thisId.schedule.friday.start,
            finish: thisId.schedule.friday.finish,
            total: cal(
              thisId.schedule.friday.start,
              thisId.schedule.friday.finish
            ),
            notes: thisId.schedule.friday.notes,
          },

          saturday: {
            start: thisId.schedule.saturday.start,
            finish: thisId.schedule.saturday.finish,
            total: cal(
              thisId.schedule.saturday.start,
              thisId.schedule.saturday.finish
            ),
            notes: thisId.schedule.saturday.notes,
          },

          sunday: {
            start: thisId.schedule.sunday.start,
            finish: thisId.schedule.sunday.finish,
            total: cal(
              thisId.schedule.sunday.start,
              thisId.schedule.sunday.finish
            ),
            notes: thisId.schedule.sunday.notes,
          },
        };

        var options = {
          format: "A4",
          orientation: "landscape",
          border: "10mm",
        };

        const document = {
          html: html,
          data: {
            users: users,
          },
          path: "./output.pdf",
          type: "buffer",
        };

        return pdf.create(document, options);
      })
      .then((result) => {
        if (req.body.send) {
          const emailData = {
            from: "diveboatemployment@gmail.com",
            to: req.body.email,
            subject: "New roster",
            text: `Please see roster attached`,
            attachments: [
              {
                filename: "roster.pdf",
                content: new Buffer(result, "utf-8"),
              },
            ],

            html: `<p>Please see roster attached</p>`,
          };

          sendEmail(emailData);
          return res.json("Success, email sent");
        } else {
          res.set(("Content-Type", "application/pdf"));
          return res.send(result);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

exports.updateAdminNotes = (req, res) => {
  const user = req.body.id;

  const notes = {
    note: req.body.note,
    priority: req.body.priority,
  };

  if (req.query.type === "carer") {
    Carer.findOneAndUpdate({ _id: user }, { $push: { notes: notes } })
      .then((result) => {
        res.json(result);
        res.status(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else if (req.query.type === "client") {
    Client.findOneAndUpdate({ _id: user }, { $push: { notes: notes } })
      .then((result) => {
        res.json(result);
        res.status(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else if (req.query.type === "complete") {
    if (req.body.who === "carer") {
      Carer.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            [`notes.$[outer].completed`]: req.body.completed,
          },
        },
        {
          arrayFilters: [{ "outer._id": req.body.noteId }],
        }
      )
        .then((result) => {
          res.json(result);
          res.status(200);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else if (req.body.who === "client") {
      Client.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            [`notes.$[outer].completed`]: req.body.completed,
          },
        },
        {
          arrayFilters: [{ "outer._id": req.body.noteId }],
        }
      )
        .then((result) => {
          res.json(result);
          res.status(200);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  }
};

exports.deleteNotes = (req, res, next) => {
  console.log(req.body);
  if (req.query.type === "carer") {
    Carer.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          notes: {
            _id: req.body.noteId,
          },
        },
      }
    )
      .then((result) => {
        res.status(200);
        console.log("success");
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({ error: err });
      });
  } else if (req.query.type === "client") {
    Client.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          notes: {
            _id: req.body.noteId,
          },
        },
      }
    )
      .then((result) => {
        res.status(200);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({ error: err });
      });
  }
};

exports.price = (req, res) => {
  
  Admin.findByIdAndUpdate(
    req.body.userID,
    { price: req.body.data },
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
};

exports.readAdmin = (req, res) => {
  const admin = req.query.Id;
  Admin.findById({_id: admin}).exec((err, admin) => {
    if (err) {
      return res.status(400).json("Opps something went wrong");
    } else {
   
      return res.status(200).json(admin);
    }
  });
};

exports.findNewClients = async (req, res, next) => {
  Client.find({
    created: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  }).exec((err, client) => {
    if (err || !client) {
      return res.status(400).json({
        error: "Client not found",
      });
    }
    res.json(client);

    next();
  });
};

exports.findNewCarers = async (req, res, next) => {
  Carer.find({
    created: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  }).exec((err, carer) => {
    if (err || !carer) {
      return res.status(400).json({
        error: "Carer not found",
      });
    }
    res.json(carer);

    next();
  });
};


//cron jobs


schedule.scheduleJob("0 0 */7 * *", () => {
  Carer.deleteMany({
    form: { $in: ["false", false] },
    created: { $lt: new Date(Date.now() - 7 * 60 * 60 * 24 * 1000) },
  }).exec((err, carer) => {
    if (err || !carer) {
      console.log("carer(s) not found", err);
    } else {
      console.log("carer(s) deleted", carer);
    }
  });

  Client.deleteMany({
    form: { $in: ["false", false] },
    created: { $lt: new Date(Date.now() - 7 * 60 * 60 * 24 * 1000) },
  }).exec((err, client) => {
    if (err || !client) {
      console.log("clients(s) not found", err);
    } else {
      console.log("clients(s) deleted", client);
    }
  });
});
