const express = require("express");
const router = express.Router();
const {signup, signInAdmin, signout, adminById, hasAuthorization, newBlog, newJob, getCarers, getClients, contactForm, updateRoster,deleteRoster, emailRoster, updateAdminNotes, deleteNotes, price, readAdmin, findNewCarers, findNewClients} = require('../controllers/admin')
const {userSignupValidator, validate} = require('../validators/validator')
const {s3UploadDelete, s3BatchDelete} = require('../helpers/index')


//admin routes

router.get("/signout", signout);
router.get("/new-clients", findNewClients);
router.get("/new-carer", findNewCarers);
router.get("/read/admin", readAdmin, );
router.get("/carers", getCarers);
router.get("/clients", getClients);

router.put("/roster/email", emailRoster);
router.put("/admin/notes", updateAdminNotes);
router.put("/roster", updateRoster);
router.put("/price", price);

router.post("/blog/:adminById", newBlog);
router.post("/jobPost/:adminById", newJob);
router.post("/uploadDeleteFile", s3UploadDelete); 
router.post("/batchDelete", s3BatchDelete);
router.post("/contactform", contactForm);
router.post("/signup", userSignupValidator(), validate, signup);
router.post("/signin", signInAdmin);

router.delete("/roster", deleteRoster);
router.delete("/admin/notes", deleteNotes);


router.param("adminId", adminById);

module.exports = router;
