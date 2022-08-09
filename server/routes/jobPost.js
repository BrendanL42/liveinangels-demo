const express = require("express");
const router = express.Router();
const {getJobPosts, apply, form, getSingleJobPost, jobById} = require('../controllers/jobPost')



router.put("/apply", apply);

router.get("/jobsboard", getJobPosts);
router.get("/jobsboard/:jobid", getSingleJobPost);
router.get("/form", form);


router.param("jobid", jobById);

module.exports = router;
