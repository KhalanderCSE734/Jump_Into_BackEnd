const express = require("express");
const URL = require("../models/url");
const {checkAuth} = require("../middlewares/auth");


const router = express.Router();

router.get("/",checkAuth, async(req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({ createdBy:req.user._id });
    res.render("home",{
        urls:allUrls
    });
})

router.get("/signup",async(req,res)=>{
    res.render("signup");
})


router.get("/login",async(req,res)=>{
    res.render("login");
})




module.exports = router;