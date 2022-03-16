//1.Import Dependencies
const express=require('express');
const { route } = require('express/lib/router');
const router=express.Router();

const request=require('request-promise');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const utils=require("../../utils/utils");
const fields=utils.fields;



//2.Setup router

router.post("/score",async(req,res) => {
    // res.send("Hello World!");
    

    const {Total_Stops,Journy_Day,Journy_Month,Dep_hour,Dep_min,Arrival_hour,Arrival_min,Duration_hours,Duration_mins,Airline,Source,Destination}=req.body;
    console.log(Total_Stops,Journy_Day,Journy_Month,Dep_hour,Dep_min,Arrival_hour,Arrival_min,Duration_hours,Duration_mins,Airline,Source,Destination);

    //populate template
    const template=[0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0];
    
    template[fields.findIndex((val) => val==="Total_Stops")]=Total_Stops;
    template[fields.findIndex((val) => val==="Journy_Day")]=Journy_Day;
    template[fields.findIndex((val) => val==="Journy_Month")]=Journy_Month;
    template[fields.findIndex((val) => val==="Dep_hour")]=Dep_hour;
    template[fields.findIndex((val) => val==="Dep_min")]=Dep_min;
    template[fields.findIndex((val) => val==="Arrival_hour")]=Arrival_hour;
    template[fields.findIndex((val) => val==="Arrival_min")]=Arrival_min;
    
    template[fields.findIndex((val) => val==="Duration_hours")]=Duration_hours;
    template[fields.findIndex((val) => val==="Duration_mins")]=Duration_mins;
    template[fields.findIndex((val) => val===`Airline_${Airline}`)]=1;
    template[fields.findIndex((val) => val===`Source_${Source}`)]=1;
    template[fields.findIndex((val) => val===`Destination_${Destination}`)]=1;
    //console.log(template);
    
    Array.prototype.reshape = function(rows, cols) {
        var copy = this.slice(0); // Copy all elements.
        this.length = 0; // Clear out existing array.
      
        for (var r = 0; r < rows; r++) {
          var row = [];
          for (var c = 0; c < cols; c++) {
            var i = r * cols + c;
            if (i < copy.length) {
              row.push(copy[i]);
            }
          }
          this.push(row);
        }
    };
    template.reshape(1,template.length);
    let data={
        "data":template
    };
    //data=JSON.stringify(data);
    //console.log(JSON.stringify(data));

    //3. Make a scoring request
    const scoringURL=process.env.SCORING_URL;
    const key=process.env.KEY;
    const headers={'Content-Type':'application/json'};
    headers['Authorization'] = `Bearer ${key}`;
    const scoringOptions={
	    method: 'post',
	    body: JSON.stringify(data),
	    headers: headers
    };
    try{
        const response = await fetch(scoringURL,scoringOptions);
        const result = await response.json();
        //console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.send(err);
    }
    

    
      
});


module.exports=router;