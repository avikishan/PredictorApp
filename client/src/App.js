import React,{useState} from "react"
import "./app.scss";
import axios from "axios";
import {
  Form,
  FormGroup,
  Select,
  SelectItem,
  Button,
  Loading,
  DatePicker,
  DatePickerInput
} from "carbon-components-react";
import {Total_Stops,Dep_hour,Dep_min,Arrival_hour,Arrival_min,Duration_hours,Duration_mins,Airline,Source,Destination} from "./utils";
import BarChart from "./components/dataviz/BarChart";


function App() {

  const [stop,setStops]=useState(0);
  // const [journeyDay,setJourneyDay]=useState(1);
  // const [journeyMonth,setJourneyMonth]=useState(1);
  const [journeyDate,setJourneyDate]=useState(null);
  const [depHour,setDepHour]=useState(0);
  const [depMin,setDepMin]=useState(0);
  const [arrivalHour,setArrivalHour]=useState(0);
  const [arrivalMin,setArrivalMin]=useState(0);
  const [durationHours,setDurationHours]=useState(0);
  const [durationMin,setDurationMin]=useState(0);
  const [airline,setAirline]=useState("Air Asia");
  const [source,setSource]=useState("Banglore");
  const [destination,setDestination]=useState("Banglore");
  const [prediction,setPrediction]=useState();
  const [scores,setScores]=useState([]);

  const runPred=async (stop,journeyDate,depHour,depMin,arrivalHour,arrivalMin,durationHours,durationMin,airline,source,destination) =>{
    //console.log(stop,journeyDay,journeyMonth,depHour,depMin,arrivalHour,arrivalMin,durationHours,durationMin,airline,source,destination);
    setPrediction("Scoring");
    const res=await axios.post("api/azureml/score", {
      "Total_Stops":parseInt(stop),
      "Journy_Day":parseInt(journeyDate[0].getDate()), 
      "Journy_Month":parseInt(journeyDate[0].getMonth()+1),
      "Dep_hour":parseInt(depHour),
      "Dep_min":parseInt(depMin), 
      "Arrival_hour":parseInt(arrivalHour),
      "Arrival_min":parseInt(arrivalMin),
      "Duration_hours":parseInt(durationHours), 
      "Duration_mins":parseInt(durationMin), 
      "Airline":airline, 
      "Source":source,
      "Destination":destination
  });
  setPrediction(res['data']['data'])
  setScores([
    ...scores,
    {
      group:stop.toString()+journeyDate[0].getDate().toString()+(journeyDate[0].getMonth()+1).toString()+airline+source+destination,
      value:res.data.data[0]
    },
  ]);

  
  console.log(prediction,scores);
  }

  // const [time,setTime]=useState("00:00");
  
  // const runShow=async (time) => {
  //   console.log(time)
  // };

  return (
    <div className="App">
      
      <div className="mainContainer">
        <div className="mainHeading">
          <h1>Air Flight Fare Prediction</h1>
        </div>
        <Form>
          <FormGroup>
            <Select id="select-0" labelText="Select # of Stops" onChange={(e)=>setStops(e.target.value)}>
              {Total_Stops.map((stopsVal)=>(
                <SelectItem text={stopsVal} value={stopsVal}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <DatePicker
              id="select-1-2"
              dateFormat="d/m/Y"
              datePickerType="single"
              value={journeyDate} onChange={(e) => setJourneyDate(e)}>
              <DatePickerInput id="select-12" labelText="Select Journey Date" placeholder="dd/mm/yyyy" />
            </DatePicker>
            {/* <Button onClick={e=> runShow(journeyDate)}>Show</Button> */}
          </FormGroup>
          {/* <FormGroup>
            <Select id="select-1" labelText="Select Journey Day" onChange={(e)=>setJourneyDay(e.target.value)}>
              {Journy_Day.map((day)=>(
                <SelectItem text={day} value={day}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-2" labelText="Select Journey Month" onChange={(e) => setJourneyMonth(e.target.value)} >
              {Journy_Month.map((month)=>(
                <SelectItem text={month} value={month}/>
              ))}
            </Select>
          </FormGroup> */}
          <FormGroup>
            <Select id="select-3" labelText="Select Departure Hour" onChange={(e) => setDepHour(e.target.value)}>
              {Dep_hour.map((hour)=>(
                <SelectItem text={hour} value={hour}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-4" labelText="Select Departure Minute" onChange={(e) => setDepMin(e.target.value)}>
              {Dep_min.map((min)=>(
                <SelectItem text={min} value={min}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-5" labelText="Select Arrival Hour" onChange={(e) => setArrivalHour(e.target.value)}>
              {Arrival_hour.map((hour)=>(
                <SelectItem text={hour} value={hour}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-6" labelText="Select Arrival Minutes" onChange={(e) => setArrivalMin(e.target.value)}>
              {Arrival_min.map((min)=>(
                <SelectItem text={min} value={min}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-7" labelText="Select Duration Hour" onChange={(e) => setDurationHours(e.target.value)}>
              {Duration_hours.map((hour)=>(
                <SelectItem text={hour} value={hour}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-8" labelText="Select Duration Minutes" onChange={(e) => setDurationMin(e.target.value)}>
              {Duration_mins.map((min)=>(
                <SelectItem text={min} value={min}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-9" labelText="Select Airline" onChange={(e) => setAirline(e.target.value)}>
              {Airline.map((airline)=>(
                <SelectItem text={airline} value={airline}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Select id="select-10" labelText="Select Source" onChange={(e) => setSource(e.target.value)}>
              {Source.map((source)=>(
                <SelectItem text={source} value={source}/>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
          <Select id="select-11" labelText="Select Destination" onChange={(e) => setDestination(e.target.value)}>
              {Destination.map((dest)=>(
                <SelectItem text={dest} value={dest}/>
              ))}
            </Select>
          </FormGroup>
          <Button onClick={e=>runPred(stop,journeyDate,depHour,depMin,arrivalHour,arrivalMin,durationHours,durationMin,airline,source,destination)}>Predict</Button>
          {/* <TimePicker id="time-picker" labelText="Time Picker" value={time} onChange={(e)=>setTime(e.target.traget.value)} >
            <TimePickerSelect id="time-picker-select-1" labelText="Time Picker" >
               <SelectItem value="AM" text="AM" />
               <SelectItem value="PM" text="PM" />
              </TimePickerSelect>
            </TimePicker>
          <Button onChange={time=> runShow(time)}>Show</Button> */}
          
        </Form>
        
        <div className="predictionContainer">
          {prediction !== "Scoring"&& prediction ?
          "The model Predicted":""}
          <div className="predictionResult">
            {prediction === "Scoring" ? (
                <Loading description="Loading..." />
              ) : !prediction ? (
                ""
              ) : (
                parseFloat(prediction)
              )}          
            </div>
        </div>
        <div className="chartContainer">
        {scores.length===0?"":<BarChart data={scores}/>}            
        </div>
      </div>
    </div>
  );
}

export default App;
