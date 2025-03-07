const fs = require("fs").promises;

const logReqRes = (fileName)=>{
    return (req,res,next)=>{
        fs.appendFile(fileName,`\n ${new Date().toLocaleString()} :- ${req.socket.remoteAddress} Entered into the Path ${req.path}\n`).then(()=>{
            next();
        })
    }
}

module.exports = {
    logReqRes,
};