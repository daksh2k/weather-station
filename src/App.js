import './App.css';
import React from 'react';
import {useState,useEffect} from 'react';
import moment from 'moment';
import ComponentWithIcon from './icons'
// import database from './firebase';
import { WiHumidity,WiRaindrops,WiDaySunny,WiDaySunnyOvercast} from "react-icons/wi";
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { alignPropType } from 'react-bootstrap/esm/types';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "humidity": 0,
      "rain" : 0,
      "temp" : 30,
      "icon" : "WiDaySunny",
      "unit" : "unit" in localStorage ? localStorage.unit : "C",
      "hist": [{temp:"10",time:"5:00 PM",rain: 2},{temp:"20",time:"6:00 PM",rain: 2},{temp:"30",time:"7:00 PM",rain: 2}],
      "loc" : [{temp:"10",location:"Fatehgunj",rain: 2},{temp:"20",location:"Subhanpura",rain: 2},{temp:"30",location:"Alkapuri",rain: 1}]
    }
  }
  render(){
    return (
    <div className="App">
      <div className="cont">
         <Current cond={this.state} />
         <div className="hourly-cont row">
         {/* Render all the location cards */}
           {this.state.loc.map((value,key) => <Location key={key} data={value} />)}
         </div>
         <div className="hourly-cont row">
         {/* Render all the previous hourly cards */}
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
  // console.log(props.cond.icon)
  return (
    <div className="curr">
        <div className="main">
          <div className="date-city text-start">
            <div className="city fw-bold">Vadodara,Gujarat,India</div>
            <div className="time">{date +" | " +time}</div>
          </div>
           <div className="temp-cont">
              <div className="b-icon">{ComponentWithIcon(props.cond.icon)}</div>
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

const Hourly = (props) =>{
 return(
 <Card className="card col time-cont">
  <Card.Body>
    <Card.Title ><div className="title">{props.data.time}</div></Card.Title>
    <Card.Text>
    <div className="temp-cont">
       <div className="temperature-sml" style = {{fontSize: '0.55em' }}>{props.data.temp}</div>
       <sup>o</sup>
       <div className="temperature-sml">C</div>
    </div>
    <div className="s-icon"><WiDaySunny /></div>
    <div className="extra-cond">
      <div className="sec humd" style = {{fontSize: '1em' }}><WiRaindrops />{props.data.rain}mm</div>
      <span>&nbsp; | &nbsp;</span>
      <div className="sec" style = {{fontSize: '1em' }}><WiHumidity />{props.data.humidity}%</div>
    </div>
    </Card.Text>
  </Card.Body>
</Card>)
}
const Location = (props) => {
  return(        
  <Card className="card col time-cont">
    <Card.Body>
      <Card.Title><div className="title">{props.data.location}</div></Card.Title>
      <Card.Text>
      <div className="temp-cont">
         <div className="temperature-sml" style = {{fontSize: '0.9em' }}>{props.data.temp}</div>
         <sup>o</sup>
         <div className="temperature-sml">C</div>
      </div>
      <div className="s-icon"><WiDaySunny /></div>
      <div className="extra-cond">
          <div className="sec humd" style = {{fontSize: '1em' }}><WiRaindrops />{props.data.rain}mm</div>
          <span>&nbsp; | &nbsp;</span>
          <div className="sec" style = {{fontSize: '1em' }}><WiHumidity />{props.data.humidity}%</div>
      </div>
      </Card.Text>
    </Card.Body>
</Card>)
}
export default App;
