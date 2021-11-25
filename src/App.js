import './App.css';
import React from 'react';
import {useState,useEffect} from 'react';
import moment from 'moment';
// import database from './firebase';
import { WiHumidity,WiRaindrops } from "react-icons/wi";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "humidity": 0,
      "rain" : 0,
      "temp" : 30,
      "unit" : "unit" in localStorage ? localStorage.unit : "C"
    }
  }
  render(){
    return (
    <div className="App">
       <Card cond={this.state} />
    </div>
  );
  }
}

const Card = (props) => {
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
    <div className="cont">
        <div className="main">
          <div className="date-city text-start">
            <div className="city fw-bold">Delhi,Delhi,India</div>
            <div className="time">{date +" | " +time}</div>
          </div>
           <div className="temp-cont">
              <div className="temperature-big">{props.cond.temp}</div>
              <sup>o</sup>
              <div className="unit">{props.cond.unit}</div>
           </div>
        </div>
        <div className="cond text-end">
            <div className="sec"><WiRaindrops />Rainfall: {props.cond.rain}mm</div>
            <div className="sec"><WiHumidity />Humidity: {props.cond.humidity}%</div>
        </div>
    </div>
  )
} 
export default App;
