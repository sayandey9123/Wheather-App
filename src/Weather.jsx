import React, { useState, useEffect } from 'react';
import './Weather.css'

const api = {
    key: "35db74d6316793ddd5dbf73a5020370c",
    base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [weatherClass, setWeatherClass] = useState("app");

    useEffect(() => {
  if (weather?.main && Array.isArray(weather.weather)) {
    const temp = weather.main.temp;
    const condition = weather.weather[0]?.main?.toLowerCase() || "";

    let newClass = "app";

    if (temp < 14) newClass += " cold";
    if (condition.includes("clear")) newClass += " sunny";
    if (condition.includes("cloud")) newClass += " cloudy";
    if (condition.includes("rain") || condition.includes("drizzle")) newClass += " rainy";
    if (condition.includes("snow")) newClass += " snowy";
    if (condition.includes("thunderstorm")) newClass += " stormy";
    if (condition.includes("wind")) newClass += " windy";
    if (condition.includes("haze") || condition.includes("mist") || condition.includes("smoke")) newClass += " hazy";

    setWeatherClass(newClass);
  }
}, [weather]);


   const search = (evt) => {
    if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                if (result.cod === 200) {
                    setWeather(result);
                    setQuery('');
                } else {
                    alert("City not found or weather data unavailable");
                    setQuery('');
                }
            });
    }
};


    const dateBuilder = (d) => {
        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
          ];
          
          let day = days[d.getDay()];
          let date = d.getDate();
          let month = months[d.getMonth()];
          let year = d.getFullYear();

          return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={weatherClass}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search Place"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={search} 
                    />
                </div>

                {(typeof weather.main != "undefined")?(
                    <div>
                    <div className="location-box">
                    <div className="location">
                        {weather.name}, {weather.sys.country}
                    </div>
                        <div className="date">
                            {dateBuilder(new Date())}
                        </div>
                    </div>
            <div className='weather-box'>
                <div className='temp'>
                    {Math.round(weather.main.temp)}℃
                </div>
                <div className='weather'>
                    {weather.weather[0].main}
                </div>
              </div>
            </div>
                ) : (' ')}
                

            </main>
        </div>
    );
};

export default Weather;
