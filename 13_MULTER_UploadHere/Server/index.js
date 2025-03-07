/**


const express = require("express");
const path = require("path");
const multer  = require('multer')
const upload = multer({ dest: './uploads' })     // 'https://www.npmjs.com/package/multer'

const staticRouter = require('./routes/staticRoutes');


const app = express();
const PORT = 8000;

//MiddleWares

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));

//MiddleWares


app.get('/',staticRouter);

app.post("/upload",upload.single('Image'),(req,res)=>{
    try{
        console.log(req.body,"Body and File",req.file);
        res.render("home",{
            msg:"File Uploaded"
        })
    }catch(err){
        console.log(err);
        res.render("home",{
            msg:"File Not Uploaded"
        })
    }
})





app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`);
})

 * 
 */


const express = require("express");
const path = require("path");
const multer  = require('multer')
  

const staticRouter = require('./routes/staticRoutes');


const app = express();
const PORT = 8000;

//MiddleWares

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));

//MiddleWares




const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      return callBack(null, './uploads')
    },
    filename: function (req, file, callBack) {
        console.log(file);
      callBack(null, `${Date.now()}_${file.originalname}`);
    }
  }) 
  
  const upload = multer({ storage: storage })
 










app.get('/',staticRouter);

app.post("/upload",upload.single('Image'),(req,res)=>{      // We can Even Get multiple images (Go and Read Documentatioin)
    try{
        console.log("Request Body is \n",req.body);
        console.log("Request File is \n",req.file);
        res.render("home",{
            src:`/Server/uploads/${req.file.filename}`,
        })
    }catch(err){
        console.log(err);
        res.render("home",{
            msg:"File Not Uploaded"
        })
    }
})

///uploads/${req.file.filename}


 
app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`);
})
