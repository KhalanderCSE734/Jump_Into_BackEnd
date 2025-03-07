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
        // return res.status(201).json({message:"Scuessfully Created",id:shortIdGenerated})
        return res.render("home",{
            id:shortIdGenerated,
        })                                                                    // For EJS
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

const handleGetAllUrls = async(req,res)=>{
    try{
        const allUrls = await URL.find();
        console.log(allUrls);
        if(allUrls.length==0){
            return res.send(`<h1>No Urls in the History</h1>`)
        }
        const html = `
            <ol>
                ${
                    allUrls.map((curUrl,ind)=>{
                        return(
                            `<li> ${curUrl.shortId}---&gt; ${ curUrl.redirectUrl } ---&gt; ${curUrl.visitHistory.length}</li>`
                        )
                    }).join("")
                }
            </ol>
        `;
        res.send(html);
    }catch(error){
        console.log("Internall Server Error");
        res.status(500).json({msg:"Internal Server Error"});
    }
}

module.exports = {
    handleCreateShortURL,
    handleClicks,
    handleGetUrlShort,
    handleGetAllUrls
}