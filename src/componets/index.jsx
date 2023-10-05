import React, { useState } from 'react'
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

function Weather()
{
    const apiKey="93820592cc313bf3c2bfaf8800109af4";
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    //states
    let [inputValue,setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let handleInput=(e)=>{
        setInputValue(e.target.value)
    }
    const checkWeather= async()=>{
        setIsLoading(true);
        const response= await fetch(apiUrl+inputValue+`&appid=${apiKey}`);
        var data=await response.json();
        if(response.status==404)
        {
            setIsError(true);
            setIsLoading(false);
        }
        else{
            setIsError(false);
            setIsLoading(false);
        }
        setWeatherData(data)
        console.log(data);
    }

    const getIcon=(weather)=> {
        const weatherIcons = {
          Clear: clear_icon,
          Clouds: cloud_icon,
          Rain: rain_icon,
          Snow: snow_icon,
          Drizzle:drizzle_icon,
          Mist:mist_icon
        };
        return weatherIcons[weather];
      }
      

    return(
    <div className="card">
        <div className="search">
            <input type="text" placeholder="Enter city name" spellCheck="false" onChange={handleInput} value={inputValue}/>
            <button onClick={checkWeather}><img src={search_icon} /></button>
        </div>
        {
            isLoading
            ?<h2>Loading</h2>
            :<></>
        }
        {
            isError 
            ?   <div className='errors'>
                    <p>Invalid City Name Re-Enter The City Name</p>
                </div> 
            : 
            <div className="weatger">
            <img src={getIcon(weatherData?.weather[0]?.main)} className="weather-icon" />
            <h1>{Math.round(weatherData?.main?.temp)}°C</h1>
            <h2 >{inputValue}</h2>
            <div className="details">
                <div className="col">
                    <img src={humidity_icon} />
                    <div>
                        <p className="humidity">{weatherData?.main?.humidity} %</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} />
                    <div>
                        <p className="wind">{weatherData?.wind?.speed} km/h</p>
                        <p>Wind Sped</p>
                    </div>
                </div>
            </div>
        </div>  
        }
        
        {/* <div className="weatger">
            <img src={getIcon(weatherData?.weather[0]?.main)} className="weather-icon" />
            <h1>{Math.round(weatherData?.main?.temp)}°C</h1>
            <h2 >{inputValue}</h2>
            <div className="details">
                <div className="col">
                    <img src={humidity_icon} />
                    <div>
                        <p className="humidity">{weatherData?.main?.humidity} %</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} />
                    <div>
                        <p className="wind">{weatherData?.wind?.speed} km/h</p>
                        <p>Wind Sped</p>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
    );
}
export default Weather;