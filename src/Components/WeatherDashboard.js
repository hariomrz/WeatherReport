import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './weather.scss'

const URL = 'http://api.openweathermap.org/'
const APIKey = '361d8fc685046b313f8068b6e101d920'

const WeatherDashboard = () => {
    const [location, setLocation] = useState('')
    const [data, setData] = useState({})
    const [err, setErr] =useState(false)
    const [searchL, setSearchL] = useState('')

    const getGeoLatLog =async()=>{
      if(!location){
        setErr(true)
        return false
      }
        try {
           const getLocation = await fetch(`${URL}geo/1.0/direct?q=${location}&limit=1&appid=${APIKey}`)
           const result = await getLocation.json()
           
           let lat = result[0]?.lat
           let lon = result[0]?.lon
           setErr(false)
           setSearchL(location)
           setLocation('')
          getWeatherReport(lat, lon)  
        } catch (error) {
            console.error('Error', error)
        }
    }

    const getWeatherReport=async(lat, lon)=>{
      try {
        const weatherData = await fetch(`${URL}/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${APIKey}`)
        const data = await weatherData.json()
        setData(data)
      } catch (error) {
        
      }
    }



    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            getWeatherReport(lat, lon)
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
        
      }, []);
  
   
  
  return (
    <div className='weather-dash-wrp'>
      <div className='search-wrp'>
        <input value={location} onChange={(e)=> setLocation(e.target.value)} placeholder='Enter location'/>
        <button onClick={()=>getGeoLatLog()}>Search</button>
      </div>
        {err && !location && <span className='err-txt'>Please enter location</span>}

        <div className="gradient-background">
        <div className="container">
          <span className="location-name">{searchL !== ''? searchL : data.name}</span>
         
          <div className="description">
            {data.weather ?<><img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} /> <span>{data.weather[0].main}</span></> : null}
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
      </div>  
         {
          data.name !== undefined &&
          <div className="footer">
            <div className="feels">
              {data.main ? <div className='bold'>{data.main.feels_like.toFixed()}°C</div> : null}
              <div>Feels Like</div>
            </div>
            <div className="humidity">
              {data.main ? <div className='bold'>{data.main.humidity}%</div> : null}
              <div>Humidity</div>
            </div>
            <div className="wind">
              {data.wind ? <div className='bold'>{data.wind.speed.toFixed()} MPH</div> : null}
              <div>Wind Speed</div>
            </div>
          </div>
         }
        </div>
    </div>
  )
}

export default WeatherDashboard


