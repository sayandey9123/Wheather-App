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
        if (typeof weather.main !== "undefined") {
            const temp = weather.main.temp;
            const condition = weather.weather[0]?.main?.toLowerCase(); // ✅ Ensure safe access

            console.log("Weather Condition:", condition);
            console.log("Temperature:", temp);

            if (temp < 14) setWeatherClass("app cold");
            else if (condition?.includes("clear")) setWeatherClass("app sunny");
            else if (condition?.includes("cloud")) setWeatherClass("app cloudy");
            else if (condition?.includes("rain") || condition?.includes("drizzle")) setWeatherClass("app rainy");
            else if (condition?.includes("wind")) setWeatherClass("app windy");
            else if (condition?.includes("haze") || condition?.includes("mist") || condition?.includes("smoke")) setWeatherClass("app hazy");
            else setWeatherClass("app");
        }
    }, [weather]);

    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setQuery('');
                })
               
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
