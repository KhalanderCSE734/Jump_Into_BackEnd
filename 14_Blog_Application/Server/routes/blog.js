const express = require("express");
const multer  = require('multer')
const {handleAddBlog,handleComment} = require("../controllers/blog");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/Blog_Uploads')
  },
  filename: function (req, file, cb) {
    // console.log(file);
    // const safeName = `${new Date().toISOString().replace(/:/g, "-")}_${file.originalname.replace(/\s+/g, "_")}`;
    const safeName = `${Date.now()}_${file.originalname}`;
    cb(null, safeName)
  }
})

const upload = multer({ storage: storage })



router.post("/",upload.single('img'),handleAddBlog);

router.post("/comments/:id",handleComment);



module.exports = router;