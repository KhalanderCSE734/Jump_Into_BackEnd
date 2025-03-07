const User = require("../models/userAuth");
const {validateToken} = require("../service/auth")
const Blog = require("../models/blog");
const Comment = require("../models/comment");


const handleGetHome = async(req,res)=>{
   const user =  validateToken(req.cookies.token);
//    console.log(user);
// console.log(blogs);
    if(req.cookies.token){
        // const blogs = await Blog.find({createdBy:user._id});
        const blogs = await Blog.find();    
        // console.log("Token found",req.cookies.token,user);
        return res.render("home",{
            logIn:user.fullName,
            blogs:blogs,
        });
    }
    console.log("No Token",req.cookies.token,user);
    return res.render("home");
}

const handleSignupPage = (req,res)=>{
    res.render("signup");
}
const handleLoginPage = (req,res)=>{
    res.render("login");
}

const handleGetBlogsPage = (req,res)=>{
    const user =  validateToken(req.cookies.token);
    if(req.cookies.token){
        // console.log("Token found",req.cookies.token,user);
        return res.render("blog",{
            logIn:user.fullName,
        });
    }
}

const handleGetSingleBlog = async(req,res)=>{
    const user =  validateToken(req.cookies.token);
    const blogId = req.params._id;
    const blog = await Blog.find({_id:blogId}).populate("createdBy");
    // console.log(blog);  // This is able to happen because we have linked the 'user' to 'blog' schema( we'll basically get 'user' object in 'blog' schema)
    // console.log(blog);
    const comments = await Comment.find({blogId:req.params._id}).populate("createdBy");
    console.log(comments);
    res.render("singleBlog",{
        logIn:user.fullName,
        blog:blog[0],
        comments
    });
}


module.exports = {
    handleGetHome,
    handleSignupPage,
    handleLoginPage,
    handleGetBlogsPage,
    handleGetSingleBlog
}