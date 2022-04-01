let express = require("express");
let app = express();
app.listen(8888,()=>{console.log("8000 port is being listened");});
app.get("/",(req,res)=>{
    res.send(req.query);
});