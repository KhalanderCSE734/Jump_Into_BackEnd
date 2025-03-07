const URL = require("../models/url");
const shortid = require("shortid");

const handleCreateShortURL = async(req,res)=>{
    try{
        const userURL = req.body.url;
        if(!userURL){
            return res.status(400).json({Error:"URL is Required"});
        }
        const shortIdGenerated = shortid();
        const CreatedDB = await URL.create({
            redirectUrl:userURL,
            shortId:shortIdGenerated,
            visitHistory:[]
        })
        return res.status(201).json({message:"Scuessfully Created",id:shortIdGenerated})
    }catch(err){
        console.log("Exited With Error",err);
    }

}

const handleClicks = async(req,res)=>{
    console.log("Came to Analytics");
    const shortId = req.params.shortId;
    const web = await URL.findOne({shortId});
    console.log("From Analytics",web);
    return res.json({totalClicks:`${web.visitHistory.length}`,analytics:`${web.visitHistory}`});
}


const handleGetUrlShort = async (req, res) => {
    const shortId = req.params.shortId;
    console.log("Received request for shortId:", shortId);

    try {
        // Update the document and return it
        const web = await URL.findOneAndUpdate(
            { shortId: shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return updated document
        );

        console.log("After findOneAndUpdate, web contains:", web);

        if (!web) {
            console.log("Short URL not found!");
            return res.status(404).json({ error: "Short URL not found" });
        }

        // res.status(200).json({msg:`${web.redirectUrl}`});
        res.redirect(`https://${web.redirectUrl}`);
    } catch (err) {
        console.log("Error occurred:", err);
        res.status(500).json({ Error: `Internal Server Error ${err}` });
    }
}

module.exports = {
    handleCreateShortURL,
    handleClicks,
    handleGetUrlShort
}