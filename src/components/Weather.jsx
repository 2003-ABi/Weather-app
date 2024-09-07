import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import clear_icon from '../assets/clear.png';
import cloudy_icon from '../assets/cloud.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import drizzle_icon from '../assets/drizzle.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const key = "----add your api key here---";

  const search = async (city) => {
    if (!city.trim()) {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message.toUpperCase());
        return;
      }

      const icon = allicons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        location: data.name,
        weather: data.weather[0].main,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  useEffect(() => {
    search("Patan");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          ref={inputRef}
          type='text'
          placeholder='Search'
          onKeyPress={handleKeyPress}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className='magni'
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} className='weather-icon' alt='Weather Icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <FontAwesomeIcon icon={faTint} className='humidity' />
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div className='bar'></div>
            <div className="col">
              <FontAwesomeIcon icon={faWind} className='windy' />
              <p>{weatherData.wind} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
