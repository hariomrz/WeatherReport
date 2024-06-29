import React, { useState, useEffect, useCallback } from 'react'
import './weather.scss'
import GIF from '../assets/weather.gif'
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
        return false;
      }
        try {
           const getLocation = await fetch(`${URL}geo/1.0/direct?q=${location}&limit=1&appid=${APIKey}`)
           const result = await getLocation.json()
           
           let lat = result[0]?.lat
           let lon = result[0]?.lon
           setErr(false)
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
        if (!weatherData.ok) {
          throw new Error('Weather data not found');
        }
        setData(data)
        setSearchL(location)
      } catch (error) {
        setData('')
        console.error('Error', error) 
      }
    }


    const getGeoLocaton =()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude
          let lon = position.coords.longitude
          getWeatherReport(lat, lon)
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    }

    useEffect(() => {
      getGeoLocaton()     
   }, []);
  
   const getLDate = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
  
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  return (
    <div className='weather-dash-wrp'>
      <div className='search-wrp'>
        <input value={location} onChange={(e)=> setLocation(e.target.value)} placeholder='Enter location'/>
        <button onClick={()=>getGeoLatLog()}>Search</button>
      </div>
        {err && !location && <span className='err-txt'>Please enter location</span>}

        <div className="gradient-background">
          {
            data == ''?
            <>
            <img src={GIF} alt='' className='nodataimg'/>
            <div className='no-txt'>No Data found</div>
            </>
            :
            <>
             <div className="container">
              <span className="location-name">{searchL !== ''? searchL:data.name}, {data?.sys?.country}</span>
              {data.dt && data.timezone ? <div className='date-txt'>{getLDate(data.dt, data.timezone)}</div> : null}
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
                  <div >
                    {data.main ? <div>{data.main.feels_like.toFixed()}°C</div> : null}
                    <div className="feels">Feels Like</div>
                  </div>
                  <div className="humidity">
                    {data.main ? <div>{data.main.humidity}%</div> : null}
                    <div className="humidity">Humidity</div>
                  </div>
                  <div className="wind">
                    {data.wind ? <div>{data.wind.speed.toFixed()} MPH</div> : null}
                    <div className="wind">Wind Speed</div>
                  </div>
                </div>
              }
            </>
          }
       
         
        </div>
    </div>
  )
}

export default WeatherDashboard


