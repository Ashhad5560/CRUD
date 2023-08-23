console.log("hello world");

import { error, log } from "console";
import express from "express";
import fs, { writeFile } from "fs"


const app = express()
const port = 8000

app.use(express.json())
const userdata = fs.readFileSync("./userdata.json","utf-8")
// console.log(userdata);

const convertjasondata = JSON.parse(userdata)
// console.log(convertjasondata);


app.post("/api/user", (req, res) =>{
    // res.send("hi")
    const data = req.body
    // console.log(dta);

    const newdata = {
        id : convertjasondata.user.length + 1,
        ...data
    }
    convertjasondata.user.push(newdata)
    fs.writeFile("./userdata.json" , JSON.stringify(convertjasondata), (error, data) =>{
        // console.log(server);
    })
})


///////////singel post id/////////
app.get('/api/user/:id', (req, res) =>{
    const id = req.params.id
    const newfinddata = convertjasondata.user.filter(item => (item.id*1) == id);
    res.status(200).send(newfinddata)
})



//////////////////// delete apis ///////////////////

app.put('/api/user/:id', (req, res)=>{
    const id = req.params.id * 1;
    // console.log(id);
    const findid = convertjasondata.user.filter(ele =>(ele.id*1) ==id)
    const change = req.body
let maxnum
    convertjasondata.user.forEach((ele,num )=> {
        if (ele.id == id) {
          maxnum = num  
        }
        
    });
    convertjasondata.user.splice(maxnum,1,change);
    console.log(convertjasondata);
    fs.writeFile("./userdata.json", JSON.stringify(convertjasondata),()=>{

    })
// console.log(maxnum);


})








// app.get("/api/user", (req,res)=>{
//     res.status(200).send("bhen puri")
// })




app.listen(port, () =>{
    console.log(`server chal raha hai ${port}`);
})
