const express = require("express");
const { handleCreateShortURL,handleClicks } = require("../controllers/url");
const router = express.Router();



router.post("/",handleCreateShortURL);

router.get("/analytics/:shortId",handleClicks);



module.exports = router;