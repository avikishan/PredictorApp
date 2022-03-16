//1.Import Dependecies
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const path =require('path');

// const path=require('path');
// const serveStatic=require('serve-static');
require("dotenv").config();

//2.Setup app and middleware

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//4.Import router
const mlRoutes=require("./routes/api/azureml");
app.use("/api/azureml",mlRoutes);








//Serve static assets if in production
if(process.env.NODE_ENV=== 'production'){
    app.use(express.static('client/build'));

    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

//3. Start Server

const port=process.env.PORT || 8000;
app.listen(port,() =>{
    console.log(`Server listening on port ${port}`);
})