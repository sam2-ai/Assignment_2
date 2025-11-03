const expresss = require ("express")
const myRouter = expresss.Router();

myRouter.get("/",(req,res) => {
    //res.send("RESULT PAGE")
    //sending response in json format by object 
    let myObjResponse = {
        srNo: 1,
        name: "Ajwa",
        course: "AWD",
        creditHours: 4,
        marks: 85,
        grade: "A"
    }
    res.json(myObjResponse);
})

module.exports = myRouter;