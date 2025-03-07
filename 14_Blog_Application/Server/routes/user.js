const express = require("express");

const {handleSignup,handleLogin,handleLogOut} = require("../controllers/user");

const router = express.Router();


router.post("/signup",handleSignup);
router.post("/login",handleLogin);
router.get("/logout",handleLogOut);

module.exports = router;