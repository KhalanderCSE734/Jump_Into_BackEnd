/**                         Let's Authenticate 
 * There Are Two(2) types of authentication 
 *      1.)Statefull Authentication :- It maintains stae or data on server side
 *      2.)Stateless Authentication :- It doesn't have a state
 *  -----StateFull----
 *       ----> When User(Client) Enters his 'UserName' and 'Password', Server creates a 'session uid' (unique id) and gives back to user and it also keeps a track of it
 *       ----> In future when 'Client' (User) sends the request to server with UID, server checks in it's entry for authorization and if user exists or not (Then provids the necessary permissions) 
 *       ----> The 'UID' may be get through 'Cookies'or through simple 'response' or through 'headers' 
 *       ----> The flow of authentication works as given in Picture
 * 
 * 
 * 
 * 
 * 
 *      To Start with this project we'll first Create a 'Model' for "User" (user collection for authentication)
 *     * We'll create User 'signup' and 'login' form in 'views'(Static Routes) and '/login and /signup' post methods in '/user'
 *     * We'll Install 'uuid' package to give unique session id as discussed above
 *     * In order to have the dictionary mentioned like in '02_Auth.jpg' we create Another folder to store the map i.e., "Service" ('Auth.js' file) and we'lll map 'user' to 'uuId' (session id)
 *     * After generating the 'uuid' and setting it in map we'll generate the 'cookie' and set it 
 *     * Now In order for certain validations like (rendering home page only if user logged in or not) we'll write one 'middleware' to validate the user based on 'cookie'
 *     * And in 'auth.js' of 'middleware' folder, in order to use 'cookies' we have to install the package (npm i cookie-parser)
 *          ---> Then require that in 'index.js' and 'use' it as middleware 'app.use(cookieParser())'
 *     * Referring to the 'other model' from 'current model' is show in 'url' model
 *                                              IMPORTANT CONCEPT
 *              ----> Any functionality of Website to work (for Example: If User Clicks 'Like' button), First We need to check if 'user' has 'loggedIn' or not so for that purpose we use 'MiddleWares' for that (Middleware helps us to check authentication(It is one part)) and Another example would be the following
 *              ----> If 'User' wants to update his profile then we need the details, basically the previous details of same user, we get it by the help of 'middleware' where we access it with the help of 'cookie' ,another best example is used here in this project itself
 *              -----> We are showing only those 'urls' to the user which he has created, In order to achieve this property, (First we have changed the 'url' model (added 'createdBy' attribute which stored userId who created(which is also gotten by 'req.user' added by middlWare(great example)))), so While 'Fetching Urls' in home page we query the 'urls' by 'userCreated' urls with the 'req.user._id' where 'user' in 'req' object is added by the 'middleware' (The logic behind adding this property of user 'object' to the 'req' object is, We fetch the cookie from 'req.cookies.jwt' or 'req.cookies.uuid' which we set when user 'loggs-in' or 'sings-up') 
 *              -----> The above point what I have written is very important (In order to understand that, follow the below project)
 */


const express = require("express");
const path = require("path");       // Require This
const cookieParser = require("cookie-parser");

const {handleGetUrlShort} = require("./controllers/url"); 
const {handleHomeRoute} = require("./controllers/home");
const { restrictToLoggedInUserOnly,checkAuth } = require("./middlewares/auth");


const URL = require("./models/url")
const connectMongoDB = require("./connection") 


const staticRoute = require("./routes/staticRouter");
const router = require("./routes/url");
const userRouter = require("./routes/user");



const app = express();
const PORT = 8000;



 connectMongoDB("mongodb://127.0.0.1:27017/URL_SHORTENER").then(()=>{     
 console.log("MongoDB Connected Successfully");
})



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());


app.use("/",staticRoute);


app.get("/example/:shortId",handleGetUrlShort);


app.use("/url",restrictToLoggedInUserOnly,router); 


app.use("/user",userRouter);



app.listen(PORT,()=>{
    console.log(`SERVER started at ${PORT}`);
})

