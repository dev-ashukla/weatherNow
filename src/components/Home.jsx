import React, { useState } from "react";
import axios from "axios";
import search from "../assets/images/search.png";
import sunny from "../assets/images/sunny.png";
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";

const Home = () => {
  const [myBg, setMyBg] = useState();
  const [city, setCity] = useState("england");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=937406b4c9da3fc3ca622211fc4520fa&q=${city}&units=metric`);
      if (response.data) {
        setWeatherData(response.data);
        console.log(response.data); // Log response data for debugging
        console.log("Weather data fetched from API");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBgImage = async () => {
    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=1&client_id=zZjRjIUenFsWMG97dm--53xmyz1vomfHPWG05hHhcb4&query=${city}`);
      if (res.data) {
        setMyBg(res.data.results[0].urls.full);
        console.log(res.data.results[0].urls.full); // Log the background image URL
      }
    } catch (err) {
      console.log('Error fetching image:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    fetchBgImage();
  };

  return (
    <div
      className="w-full flex flex-col items-center h-screen bg-cover bg-center absolute"
      style={{ backgroundImage: `url(${myBg})` }}
    >
      <div>
        <h1 className="text-4xl font-semibold font-serif italic">Weather App</h1>
        <div className="bg-white/85 h-[50vh] flex flex-col border rounded-lg w-auto p-4">
          <div className="flex justify-center items-center gap-2 mb-4">
            <input
              type="text"
              name="search-bar"
              className="border items-center text-center rounded-lg w-[70%] h-[35px] p-2"
              placeholder="Search your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <img src={search} alt="search-icon" className="h-[35px]" onClick={handleSubmit} />
          </div>
          {weatherData && (
            <>
              <div className="flex flex-row items-center mb-4">
                <h1 className="font-bold text-4xl mx-5">{weatherData.main.temp}°C</h1>
                <img src={sunny} alt="sunny" className="h-[100px] w-[100px]" />
              </div>
              <div className="flex flex-row items-center">
                <LuWind className="text-4xl text-black mx-5" />
                <h1 className="font-bold text-xl">{weatherData.wind.speed} km/h</h1>
              </div>
              <div className="flex flex-row items-center">
                <WiHumidity className="text-4xl text-black mx-4" />
                <h1 className="font-bold text-xl mx-2">{weatherData.main.humidity} %</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
