const Blog = require("../models/blog");
const {validateToken} = require("../service/auth");
const Comment = require("../models/comment");


const handleAddBlog = async(req,res)=>{
    try{
        const user =  validateToken(req.cookies.token);
        // console.log("File is",req.file);
        // console.log("Body is ",req.body);
        // console.log("File is ",req.file);
        const {title,body} =req.body;
        // const filePath = req.file.filename;
        // console.log(req.file.filename);
        // console.log(user);
        const blog = await Blog.create({
            title,
            body,
            coverImageURl:`/Blog_Uploads/${req.file.filename}`,
            createdBy:user._id,
        })
        res.redirect("/");
    }catch(err){
        console.log("File Upload Error is ",err);
    }
}

const handleComment = async(req,res)=>{
    try{
        const user =  validateToken(req.cookies.token);
        // console.log(user);
        const content = req.body.content;
        // console.log(content);
        // console.log(user);
        // console.log(req.params.id);
        const comment = await Comment.create({
            content:content,
            createdBy:user,
            blogId:req.params.id,
        })
        res.redirect(`/blogDetail/${req.params.id}`);
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    handleAddBlog,
    handleComment,
}