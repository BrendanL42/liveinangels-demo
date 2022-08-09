const express = require("express");
const router = express.Router();
const {getUser, updateData, userById, getDocs, getCarer, getAllDocs,submitRoster, } = require('../controllers/carer')
const {requireSignin, getCarers } = require('../controllers/admin')


router.put("/update/:userId", requireSignin, updateData);
router.put("/roster/km/:userId", submitRoster);

router.post("/carers", getCarers);

router.get("/read/:userId", requireSignin, getUser);
router.get("/form/documents/:userId", getDocs);
router.get("/documents/:userId", getAllDocs);
router.get("/carer/:userId", getCarer);


router.param("userId", userById);

module.exports = router;
