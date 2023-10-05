import React from 'react'
import './Weather.css'
import search_icon from './assest/search.png'
import clear_icon from './assest/clear.png'
import cloud_icon from './assest/clouds.png'
import drizzle_icon from './assest/drizzle.png'
import humidity_icon from './assest/humidity.png'
import mist_icon from './assest/mist.png'
import rain_icon from './assest/rain.png'
import snow_icon from './assest/snow.png'
import wind_icon from './assest/wind.png'


const Weatherapp =() => {
    const apiKey="93820592cc313bf3c2bfaf8800109af4";
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    const checkWeather= async()=>{
        const cityName = document.querySelector(".search input").value;
        const response= await fetch(apiUrl+cityName+`&appid=${apiKey}`);
        var data=await response.json();
        console.log(data);
        //console.log(Math)
        if(response.status==404)
        {
            document.querySelector(".error").style.display="block";
            document.querySelector(".weatger").style.display="none";
        }
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c"
        document.querySelector(".city").innerHTML=data.name
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%"
        document.querySelector(".wind").innerHTML=data.wind.speed+" km/h"
        if(data.weather[0].main === "Clouds")
        {
            document.querySelector(".weather-icon").src=cloud_icon
        }
        else if(data.weather[0].main === "Clear")
        {
            document.querySelector(".weather-icon").src=clear_icon
        }
        else if(data.weather[0].main === "Rain")
        {
            document.querySelector(".weather-icon").src=rain_icon
            console.log("hello")
        }
        else if(data.weather[0].main === "Drizzle")
        {
            document.querySelector(".weather-icon").src=drizzle_icon
        }
        else if(data.weather[0].main === "Mist")
        {
            document.querySelector(".weather-icon").src={mist_icon}
        }
       document.querySelector(".weatger").style.display="block";
       document.querySelector(".error").style.display="none"
    }
    
  return (
    <div className="card">
        <div className="search">
            <input type="text" placeholder="Enter city name" spellCheck="false" />
            <button onClick={()=>{checkWeather()}}><img src={search_icon} /></button>
        </div>
        <div className="error">
            <p>Invalid City Name Re-Enter The City Name</p>
        </div>
        <div className="weatger">
            <img src={rain_icon} className="weather-icon" />
            <h1 className="temp">22°c</h1>
            <h2 className="city">guntur</h2>
            <div className="details">
                <div className="col">
                    <img src={humidity_icon} />
                    <div>
                        <p className="humidity">50%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} />
                    <div>
                        <p className="wind">50 km/h</p>
                        <p>Wind Sped</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Weatherapp
