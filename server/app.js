const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require('mongoose-function')(mongoose);
const cors = require('cors');
const cookieParser = require('cookie-parser')
require("dotenv").config();


// datebase
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DataBase Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DataBase connection error: ${err.message}`);
});


// bring in routes
const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");
const carerRoutes = require("./routes/carer");
const jobPostRoutes = require("./routes/jobPost");
const client = require("./routes/client");

var corsOptions = {
  origin: process.env.CLIENT_URL ,
  credentials:  true
}



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan("dev"));
app.use(cors(corsOptions)); 

//middleware
app.use("/", blogRoutes);
app.use("/", adminRoutes);
app.use("/", carerRoutes);
app.use("/", jobPostRoutes);
app.use("/", client);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized, your not meant to be here.... go away!' });
    }
});

// listen on port
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
  });
 