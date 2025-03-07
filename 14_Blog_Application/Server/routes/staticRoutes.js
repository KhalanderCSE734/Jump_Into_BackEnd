const express = require("express");

const {handleGetHome, handleSignupPage,handleLoginPage,handleGetBlogsPage,handleGetSingleBlog } = require("../controllers/staticUser");

const router = express.Router();

router.get("/",handleGetHome);
router.get('/signup',handleSignupPage);
router.get('/login',handleLoginPage);
router.get('/blog',handleGetBlogsPage);
router.get('/blogDetail/:_id',handleGetSingleBlog);


module.exports = router;