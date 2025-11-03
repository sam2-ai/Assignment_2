const express = require ("express")
const myRouter = express.Router();
myRouter.get("/e1", (req,res) => {
    res.send("Exercise 1, 2, 3,4")
})
module.exports = myRouter