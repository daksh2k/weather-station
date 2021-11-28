import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import ComponentWithIcon from './icons'
import { WiHumidity, WiRaindrops, WiDaySunny } from "react-icons/wi";
import Card from 'react-bootstrap/Card';

// Firebase imports
import db from './firebase'
import {ref, onValue, child, get} from "firebase/database";

class App extends React.Component {
  constructor(props) {
    super(props);
    const timeCur = new Date()
    const time1 = new Date()
    const time2 = new Date()
    const time3 = new Date()
    time1.setTime(time1-1000*60*60)
    time2.setTime(time2-1000*60*60*2)
    time3.setTime(time3-1000*60*60*3)
    this.state = {
      "humidity": 60,
      "rain": 2,
      "temp": 28,
      "icon": "WiDaySunny",
      "unit": "unit" in localStorage ? localStorage.unit : "C",
      "hist": [
        { temp: "30", time: time3.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'}), rain: 0, humidity: 50 }, 
        { temp: "28", time: time2.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'}), rain: 2, humidity: 50 }, 
        { temp: "27", time: time1.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'}), rain: 2, humidity: 50 }, 
        { temp: "26", time: timeCur.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'}), rain: 2, humidity: 50 }],
      "loc": [
        { temp: "30", location: "Fatehgunj", rain: 2, humidity: 50 }, 
        { temp: "28", location: "Subhanpura", rain: 2, humidity: 45 }, 
        { temp: "29", location: "Alkapuri", rain: 1, humidity: 55 }]
    }
  }
  componentDidMount(){
    // this.setState({
    //   hist : [
    //     {temp: this.state.his}
    //   ] 
    // })
    // const allData = ref(db);
    // get(child(allData, "Calculated Data")).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const data = snapshot.val()
    //     console.log(data);
    //     this.updateWeatherData(data)
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    const allData = ref(db, 'UNITS');
    onValue(allData, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      this.updateWeatherData(data);
    });
  }
 updateWeatherData = (data) => {
    const curr = data["UNIT_1"][Object.keys(data["UNIT_1"])[Object.keys(data["UNIT_1"]).length -1]]
    const prev = data["UNIT_1"][Object.keys(data["UNIT_1"])[Object.keys(data["UNIT_1"]).length -2]]
    console.log(curr)
    this.setState({ 
      prev: prev,
      humidity: curr?.dht?.humidity || this.state.prev?.dht?.humidity,
      temp: curr?.dht?.temperature || this.state.prev?.dht?.temperature,
      rain: curr?.water?.water || this.state.prev?.water?.water
    })
  }
  render() {
    return (
      <div className="App">
        <div className="cont">
          <Current cond={this.state} />
          <div className="hourly-cont row">
            {/* Render all the location cards */}
            {this.state.loc.map((value, key) => <Location key={key} data={value} />)}
          </div>
          <div className="hourly-cont row">
            {/* Render all the previous hourly cards */}
            {this.state.hist.map((value, key) => <Hourly key={key} data={value} />)}
          </div>
        </div>
      </div>
    );
  }
}

const Current = (props) => {
  const [date, setDate] = useState(moment().format('dddd, MMMM Do YYYY'))
  const [time, setTime] = useState(moment().format('h:mm a'))
  useEffect(() => {
    const dataInterval = setInterval(() => {
      setDate(moment().format('dddd, MMMM Do YYYY'))
    }, 60000)
    const timeInterval = setInterval(() => {
      setTime(moment().format('h:mm a'))
    }, 1000)
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
          <div className="time">{date + " | " + time}</div>
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

const Hourly = (props) => {
  return (
    <Card className="col-sm-12 time-cont">
      <Card.Body>
        <Card.Title ><div className="title">{props.data.time}</div></Card.Title>
        <Card.Text>
          <div className="temp-cont">
            <div className="temperature-sml" style={{ fontSize: '0.55em' }}>{props.data.temp}</div>
            <sup>o</sup>
            <div className="temperature-sml">C</div>
          </div>
          <div className="s-icon"><WiDaySunny /></div>
          <div className="extra-cond">
            <div className="sec humd" style={{ fontSize: '1em' }}><WiRaindrops />{props.data.rain}mm</div>
            <span>&nbsp; | &nbsp;</span>
            <div className="sec" style={{ fontSize: '1em' }}><WiHumidity />{props.data.humidity}%</div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>)
}
const Location = (props) => {
  return (
    <Card className="col-sm-12 time-cont location-cont">
      <Card.Body>
        <Card.Title><div className="title">{props.data.location}</div></Card.Title>
        <Card.Text>
          <div className="temp-cont">
            <div className="temperature-sml" style={{ fontSize: '0.9em' }}>{props.data.temp}</div>
            <sup>o</sup>
            <div className="temperature-sml">C</div>
          </div>
          <div className="s-icon"><WiDaySunny /></div>
          <div className="extra-cond">
            <div className="sec humd" style={{ fontSize: '1em' }}><WiRaindrops />{props.data.rain}mm</div>
            <span>&nbsp; | &nbsp;</span>
            <div className="sec" style={{ fontSize: '1em' }}><WiHumidity />{props.data.humidity}%</div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>)
}
export default App;
