const express = require ("express")
const myRouter = express.Router();

myRouter.get("/dev", (req,res) =>{    //previous wala endpoint kuch bhi ho jaisy /web mgr usky baad /dev zaroor ana chahiye, but if on;y / here its mean only previous endpoint will work for this func. to execute 
    res.send("Hello World from Web page")
})
module.exports = myRouter