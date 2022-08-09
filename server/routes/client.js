const express = require("express");
const router = express.Router();
const { newClient, updateClient, userById, updateNotes, readClient, form,deleteNotes } = require("../controllers/client");
const {requireSignin} = require("../controllers/admin")


router.put("/new/client/", newClient);
router.put("/client/update/:userId", requireSignin, updateClient);
router.put('/client/notes', requireSignin,  updateNotes);

router.get("/client/:userId", readClient);
router.get("/clients/form/", form);


router.param("userId", userById);


module.exports = router;
