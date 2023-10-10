const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const fs = require("fs")

const newReg = require('./mongo_model/model')
const app = express();

const port = 80;

// MongoDB 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost/Ladakh').then(()=>
  {
    console.log("Database Connected Successfull.")
  }).catch((err)=>
  {
    console.error("Error");
  })
}

app.use(express.static('./'));

app.set("view engine", 'html');
app.set('views', path.join(__dirname, 'views'))
// Endpoints

app.use(express.urlencoded());

app.get("/", (req, res)=> 
{
    res.status(200).send("index.html")
})

app.get("/regForm", (req, res)=> 
{
    res.status(200).sendFile(__dirname+"/regForm.html")
})

app.post('/regForm', (req, res) => 
{
    user1 = new newReg(req.body);
    newReg.findOne({phone: user1.phone}).then((result)=>
    {
        console.log(result);
        // const empty = "[]";
        // console.log(empty);

        // if("[]" == result)
        // {
        //     console.log("Mai pagal hu")
        // }


        if(result == undefined)
        {
            let myData = new newReg(req.body);
            myData.save().then(()=>
            {  
            res.status(200).send('<script>alert("Your Details has been saved Successfully"); window.location.href = "/regForm"; </script>');
                    
            }).catch(()=>
             {
                res.status(400).send('<script>alert("Something Went Wrong!"); window.location.href = "/regForm"; </script>');
                })
        }
        else
        {
            res.status(400).send('<script>alert("User Already Exists!"); window.location.href = "/regForm"; </script>');
        }

     

            // }
    });
});
    
    app.listen(port, ()=>{
        console.log(`The server is started successfully on port ${port}`);
    });