const express = require("express");
const { handleCreateShortURL,handleClicks,handleGetAllUrls } = require("../controllers/url");
const router = express.Router();


router.get("/",handleGetAllUrls);

router.post("/",handleCreateShortURL);

router.get("/analytics/:shortId",handleClicks);



module.exports = router;