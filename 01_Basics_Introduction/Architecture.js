/*

When client sends the request, Node.js will be recieving that request
As it's there in 01Architecture.jpg, when the request comes to node.js it (request) goes to "Event Queue" in node.js, and we have "Event Loop" which will continuously watch the Queue if requests are there or not (Handling will be FIFO). And It picks up all the request and handle those one by one 
The Request can be of two types 1.)Blocking Operations(Synchronous). 2.)Non-Blocking operations (Asynchrounous) 

If the request is Non-Blocking then "Event-Loop" will Process it and sends the response
If it is Blocking request  then It'll go to "Thread Pool" (Pool Of Threads)  (Max 4 workers(Thread) used to be there in Thread) Thread completes the task and sends the request 





*/

// import fs from 'fs';
// import path from 'path';


/*

//                                                        Example for synchrounous execution
const fs = require("fs");
const path = require("path");

console.log(1);

const filePath = path.join(__dirname,"./test.js");

const content = fs.readFileSync(filePath,"utf-8");

console.log(content);

console.log(2);


*/
/*

To create new folder wherever we want 

try{
    const fs = require("fs");
    const path = require("path");
    
    const newDir = path.join(__dirname,"../CheckDir");
    
    fs.mkdirSync(newDir,{recursive:true});
    
    const filePath = path.join(newDir,"./checkFile.txt");
    
    fs.writeFileSync(filePath,"SuccessFully Created");
}catch(error){
    console.log(error.message);
}


*/

/*


const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"../CheckDir/checkFile.txt");

fs.writeFileSync(filePath,`Successfully Created \n ${new Date().toLocaleString()}`)
fs.appendFileSync(filePath,`Successfully Created \n ${new Date().toLocaleString()}`)


*/


/*
const os = require("os");

console.log(os.cpus().length);

*/


/*

//                                          One way to read file

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,"test.js");


fs.readFile(filePath,"utf-8",(err,data)=>{
    if(err){
        console.log("Error Occured", err);
        return;
    }
    console.log(data);
})

*/


/*
//                                          Another Best way


const fs = require("fs").promises;                  // Need to include 'PROMISES'
const path = require("path");

const filePath = path.join(__dirname,"test.js");

fs.readFile(filePath,"utf-8").then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log("Error Occured",error);
})



*/

//              To Delete the File
/**

const fs = require('fs').promises
const path = require('path');
const filePath = path.join(__dirname,'temp.c');
fs.writeFile(filePath,`#include<stdio.h> \n int main(){ \n printf("Hello From Node.js"); \n} `).then((data)=>{
    console.log("Data is ",data);
}).catch((err)=>{
    console.log(err);
})

fs.unlink(filePath).then((data)=>{
    console.log("File Deleted Successfully ");
}).catch((error)=>{
    console.log("Error Occured",error);
})
 * 
*/

const fs = require('fs').promises
const path = require('path');
const exePath = path.join(__dirname,'temp.exe');

fs.unlink(exePath).then((data)=>{
    console.log("File Deleted Sucessfully");
}).catch((err)=>{
    console.log("Error Occured ",err);
})

