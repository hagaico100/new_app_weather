import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/Weather';
import Form from './components/Form';
import axios from 'axios';
import React,{ useState, useEffect } from "react";


function App() {
const [city, setCity] = useState({
name:"",
temp:"",
tempMax:"",
tempMin:"",
description:"",
icon:"",
date:"",
lat:"",
lon:"",
err: false,
});

const [cityLatLon, setCityLatLon] = useState({
        day1_temp: "",
        day2_temp: "",
        day3_temp: "",
        day4_temp: "",
        day1_icon: "",
        day2_icon: "",
        day3_icon: "",
        day4_icon: "",
        day1_date: "",
        day2_date: "",
        day3_date: "",
        day4_date: ""
});

 
const getWeather = async(cityName) =>{
  const nameOfCity= cityName;
  console.log("name:", nameOfCity);
  let uri = `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&appid=c04f39806d0dab0c65e4bf484de4c9be&lang=he`;
  let encoded = encodeURI(uri);
  
  await axios.get(encoded)
  .then(function (response) {

    var data = response.data;
    getWeatherLatLon(data.coord.lat, data.coord.lon);

    //console.log('data:' , data);
    var d = new Date();
    
    setCity({
      name:data.name,
      description:data.weather[0].description,
      icon:data.weather[0].icon,
      date:d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear(),
      lon:data.coord.lon,
      lat:data.coord.lat,
      temp:((data.main.temp-273.15)).toFixed(0),
      tempMax:((data.main.temp_max-273.15)).toFixed(0),
      tempMin:((data.main.temp_min-273.15)).toFixed(0),
      err:false
    })

  }) .catch(function (error) {
  // handle error
  console.log("err1",error);
  setCity({err:true});    

  })
  
}
  const getWeatherLatLon = async(lat,lon) =>{
    let uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=c04f39806d0dab0c65e4bf484de4c9be&lang=he`;
    let encoded = encodeURI(uri);
    
    await axios.get(encoded)
    .then(function (response) {
      
      var data = response.data;
      console.log('data lat lon:' , data.daily);
      setCityLatLon({
        day1_temp: ((data.daily[1].temp.day-273.15)).toFixed(0),
        day2_temp: ((data.daily[2].temp.day-273.15)).toFixed(0),
        day3_temp: ((data.daily[3].temp.day-273.15)).toFixed(0),
        day4_temp: ((data.daily[4].temp.day-273.15)).toFixed(0),
        day1_icon: data.daily[1].weather[0].icon,
        day2_icon: data.daily[2].weather[0].icon,
        day3_icon: data.daily[3].weather[0].icon,
        day4_icon: data.daily[4].weather[0].icon,
        day1_date: data.daily[1].dt,
        day2_date: data.daily[2].dt,
        day3_date: data.daily[3].dt,
        day4_date: data.daily[4].dt
        
      });
  
    }) .catch(function (error) {
    // handle error
    console.log("err1",error);
    setCity({err:true});    
    })
    }

// run function one time in start:
useEffect(() => {
  getWeather("ירושלים");
  setCity({error:false});
}, []);

return (
  <div className="App">
  <Form 
      sendCity= {getWeather} 
  />

  <Weather
      name={city.name}
      temp={city.temp}
      description={city.description}
      icon={city.icon}
      date= {city.date}
      tempMin={city.tempMin}
      tempMax={city.tempMax}
      cityDay={cityLatLon}
      erorr= {city.err} 

  />
  </div>
);
}

export default App;
