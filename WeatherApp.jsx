import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import { useState } from "react";

const WeatherApp = () => {
  const [data, setData] = useState(null); // Initialize with null
  const [location, setLocation] = useState("");
  const api_Key = "b0a44af34f5301222ba84ff0b85aa522";

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_Key}`;
      const res = await fetch(url);
      const searchData = await res.json();

      if (res.ok) {
        setData(searchData);
        setLocation("");
      } else {
        alert(searchData.message || "Location not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const weatherType = data?.weather ? data.weather[0].main : "Clear";
  const weatherIcon = () => {
    switch (weatherType.toLowerCase()) {
      case "clear":
        return sunny;
      case "clouds":
        return cloudy;
      case "rain":
        return rainy;
      case "snow":
        return snowy;
      default:
        return sunny;
    }
  };

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">
              {data?.main ? `${Math.floor(data.main.temp)}°C` : "--"}
              {data?.name ? ` (${data.name}, ${data.sys.country})` : ""}
            </div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-label="Search for location"
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {data ? (
          <>
            <div className="weather">
              <img src={weatherIcon()} alt={weatherType} />
              <div className="weather-type">{weatherType}</div>
              <div className="temp">{Math.floor(data.main.temp)}°C</div>
            </div>
            <div className="weather-date">
              <p>{new Date().toDateString()}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{data.main.humidity}%</div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{Math.round(data.wind.speed)} km/h</div>
              </div>
            </div>
          </>
        ) : (
          <p className="no-data">Please search for a location</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
