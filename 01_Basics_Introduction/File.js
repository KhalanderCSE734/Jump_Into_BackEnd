// // import fs from "fs";
// const fs = require("fs");
// const path = require("path");
// //Both above declarations are valid


// // console.log(fs);
// const filePath = path.join(__dirname,"test.js");


// fs.writeFileSync(filePath,"console.log(`Hello JavaScript`);");

// const text = fs.readFileSync(filePath,"utf-8");

// console.log(text);








const fs = require("fs");

// Synchrounous
// fs.writeFileSync('./test.txt',"Hello Test");

//Asynchronous
// fs.writeFile('./test.txt',"Hello There, this is aysnchronous",(error)=>{});


const path = require("path");

// console.log(path);

const filePath = path.join(__dirname,"newFile.txt");

// fs.writeFile(filePath,"I'm creating the file",(error)=>{console.log("Error",error);})

// const result = fs.readFileSync(filePath,"utf-8");

// console.log(result);


/*
fs.readFile(filePath,"utf-8",(err,res)=>{
    if(err){
        console.log(err);
    } else{
        console.log(res);
    }
})

If we don't use 'utf-8' then we might get some buffered output like '<Buffer 48 65 6c 6c 6f 20 47 75 79 73>'

*/



/**
 * Create a Folder Outside the current directory and file in it
    const folderPath = path.join(__dirname,"../newFile");
    console.log(folderPath);
    const filePath = path.join(folderPath,'Program.txt');
    console.log(filePath);
*/










const date = new Date();


//fs.appendFileSync(filePath,`\n${date}`);

const copyPath = path.join(__dirname,"copyFile.txt");

//fs.copyFileSync(filePath,copyPath)

//  fs.unlinkSync(copyPath);


// const stats = fs.statSync(filePath);
// const stats = fs.statSync(filePath).isFile();
const stats = fs.statSync(filePath).isDirectory();

console.log(stats);