const fs = require("fs").promises;
const path = require("path");

const file = path.join(__dirname,"temp.txt");

console.log(1);
fs.writeFile(file,"Hi Guys").then(()=>{}).catch((err)=>{console.log("Error Occured",err);});
console.log(2);

console.log(3);

fs.readFile(file,"utf-8").then((data)=>{console.log(data);}).catch((err)=>{console.log(err);});

console.log(4);

fs.unlink(file).then((data)=>{
    console.log("File Deleted SuccessFully",data);
}).catch((err)=>{
    console.log("Terminated With Error While Deleting",err);
})