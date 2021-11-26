import './App.css';
import React from 'react';
import {useState,useEffect} from 'react';
import moment from 'moment';
// import database from './firebase';
import { WiHumidity,WiRaindrops } from "react-icons/wi";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { alignPropType } from 'react-bootstrap/esm/types';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "humidity": 0,
      "rain" : 0,
      "temp" : 30,
      "unit" : "unit" in localStorage ? localStorage.unit : "C",
      "hist": [{temp:"10"},{temp:"20"},{temp:"30"}]
    }
  }
  render(){
    return (
    <div className="App">
      <div className="cont">
         <Current cond={this.state} />
         <div className="hourly-cont row">
           {this.state.hist.map((value,key) => <Hourly key={key} data={value} />)}
         </div>
       </div>
    </div>
  );
  }
}

const Current = (props) => {
  const [date,setDate] = useState(moment().format('dddd, MMMM Do YYYY'))
  const [time,setTime] = useState(moment().format('h:mm a'))
  useEffect(() => {
    const dataInterval =  setInterval(() => {
      setDate(moment().format('dddd, MMMM Do YYYY'))
    },60000)
    const timeInterval = setInterval(() => {
      setTime(moment().format('h:mm a'))
    },1000)
  return () => {
    clearInterval(dataInterval)
    clearInterval(timeInterval)
  }
  })
  return (
    <div className="curr">
        <div className="main">
          <div className="date-city text-start">
            <div className="city fw-bold">Vadodara,Gujarat,India</div>
            <div className="time">{date +" | " +time}</div>
          </div>
           <div className="temp-cont">
              <div className="temperature-big">{props.cond.temp}</div>
              <sup>o</sup>
              <div className="unit">{props.cond.unit}</div>
              <div className="cond text-end">
                <div className="sec"><WiRaindrops />Rainfall: {props.cond.rain}mm</div>
                <div className="sec"><WiHumidity />Humidity: {props.cond.humidity}%</div>
              </div>
           </div>
        </div>
        {/*<div className="cond text-end">
            <div className="sec"><WiRaindrops />Alkapuri: {props.cond.rain}mm</div>
            <div className="sec"><WiHumidity />OP Road: {props.cond.humidity}%</div>
  </div>*/}
        {/*<div className="cond text-end">
            <div className="sec"><WiRaindrops />Rainfall: {props.cond.rain}mm</div>
            <div className="sec"><WiHumidity />Humidity: {props.cond.humidity}%</div>
        </div>*/}
        <Card style={{ width: '6rem' , height: '6rem'}}>
            <Card.Body>
              <Card.Title ><p style = {{fontSize: '0.6em'}}>Alkapuri</p></Card.Title>
              <Card.Text>
              <div className="temperature-sml" style = {{fontSize: '0.7em' }}>{props.cond.temp}</div>
              <sup>o</sup>
              <div className="unit">{props.cond.unit}</div>
              <div className="sec" style = {{fontSize: '0.5em' }}><WiRaindrops />Rainfall: {props.cond.rain}mm</div>
              <div className="sec" style = {{fontSize: '0.5em' }}><WiHumidity />Humidity: {props.cond.humidity}%</div>
              </Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
} 

const Hourly = (props) =>{
 return(
   <div className="card col time-cont"> 
     <div className="hist-time">{props.data.time}</div>
     <div className="hist-icon">{props.data.icon}</div>
     <div className="hist-temp">{props.data.temp}</div>
   </div>
 ) 
}
export default App;
