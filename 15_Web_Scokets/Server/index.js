/**
 *              'socket.io'
 * 
 */

import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';


const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.urlencoded({ extended:false }));


const server = http.createServer(app);


const io = new Server(server);

io.on('connection',(socket)=>{              // 'scoket' ----> 'USER'
    // console.log(`A User Is Connected`);
    socket.on("chat_message",(msg)=>{
        console.log("Message is ",msg);
        io.emit(`chat_message`,msg);
    })
})



app.get("/",(req,res)=>{
    res.render("index");
})


server.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})