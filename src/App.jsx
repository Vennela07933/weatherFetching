// // import Aos from "aos";
// // import "aos/dist/aos.css";
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./App.css";
// // import { FaSun, FaCloudRain, FaSnowflake, FaCloud } from "react-icons/fa";
// // const getWeatherIcon = (main) => { switch (main) { case "Clear": return <FaSun color="orange"/>; case "Clouds": return <FaCloud color="grey"/>; case "Rain": return <FaCloudRain color="grey"/>; case "Snow": return <FaSnowflake color="grey"/>; default: return <FaCloud />; } };
// // const App = () => {
// //   const [weather, setWeather] = useState(null);
// //   const [city, setCity] = useState("");

// //   const fetchWeather = () => {
// //     if (!city) return;
// //     axios
// //       .get(
// //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a9ced7bc91d6f16704ec09894de7843a`
// //       )
// //       .then((res) => setWeather(res.data))
// //       .catch(() => {
// //         alert("City not found");
// //         setWeather(null);
// //       });
// //   };

// //   useEffect(() => {
// //     Aos.init({ duration: 1000, 
// //       easing: "ease",
// //       once:true
// //         });
// //             fetchWeather();
// //   }, []);

// //   return (
// //     <div className="app-container">
// //      <div className="weather-container" data-aos="fade-up">
// //   <h1 data-aos="zoom-in">Weather App</h1>

// //   <input
// //     type="text"
// //     placeholder="Enter city"
// //     value={city}
// //     onChange={(e) => setCity(e.target.value)}
// //     className="city-input"
// //     data-aos="fade-right"
// //   />
// //   <button onClick={fetchWeather} className="search-btn" data-aos="fade-left">
// //     Search
// //   </button>

// //   {weather ? (
// //     <div className="weather-info" data-aos="flip-up">
// //       <h2>{weather.name}</h2>
// //       <p>{getWeatherIcon(weather.weather[0].main)} {weather.weather[0].description}</p>
// //       <p>Temperature: {weather.main.temp}°C</p>
// //       <p>Feels like: {weather.main.feels_like}°C</p>
// //       <p>Humidity: {weather.main.humidity}%</p>
// //       <p>Weather: {weather.weather[0].description}</p>
// //       <p>Wind Speed: {weather.wind.speed} m/s</p>
// //     </div>
// //   ) : (
// //     <p className="loading" data-aos="fade-in">Loading...</p>
// //   )}
// // </div>

// //     </div>
// //   );
// // };
// // export default App
// // // export default App;
// // import React from 'react'
// // import { Route, Routes } from 'react-router-dom'
// // import Component1 from './Comp'

// // const App = () => {
// //   return (<>
// //     <Routes><Route path='/about' element={<Component1/>}/></Routes>hi
// //    </>
      
  
// //   )
// // }

// // export default App
import React, { useState, useEffect } from "react";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import "./App.css";

// React Icons
import { FaSun, FaCloudRain, FaSnowflake, FaCloud } from "react-icons/fa";

// Chart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Weather Icon Helper
const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear": return <FaSun color="orange" />;
    case "Clouds": return <FaCloud color="grey" />;
    case "Rain": return <FaCloudRain color="blue" />;
    case "Snow": return <FaSnowflake color="lightblue" />;
    default: return <FaCloud color="darkgrey" />;
  }
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const fetchWeather = () => {
    if (!city) return;
    setError(null);

    // Forecast API (5-day / 3-hour intervals)
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=3fe3df1b307ce6802b082acefabe2b70`
      )
      .then((res) => setWeather(res.data))
      .catch(() => {
        setError("City not found");
        setWeather(null);
      });
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
    fetchWeather();
  }, []);

  // Chart Data
  const chartData = weather ? {
    labels: weather.list.map(item =>
      new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weather.list.map(item => item.main.temp),
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.2)",
        tension: 0.3,
        fill: true,
      }
    ]
  } : null;

  return (
    <div className="app-container">
      <div className="weather-container" data-aos="fade-up">
        <h1 data-aos="zoom-in">Weather App</h1>

        {/* Input Section */}
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          className="city-input"
          data-aos="fade-right"
        />
        <button onClick={fetchWeather} className="search-btn" data-aos="fade-left">
          Search
        </button>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Weather Info */}
        {weather ? (
          <div className="weather-info" data-aos="flip-up">
            <h2>{weather.city.name}, {weather.city.country}</h2>
            <p>
              {getWeatherIcon(weather.list[0].weather[0].main)}{" "}
              {weather.list[0].weather[0].description}
            </p>
            <p>Temperature: {weather.list[0].main.temp}°C</p>
            <p>Feels like: {weather.list[0].main.feels_like}°C</p>
            <p>Humidity: {weather.list[0].main.humidity}%</p>
            <p>Wind Speed: {weather.list[0].wind.speed} m/s</p>
          </div>
        ) : (
          <p className="loading" data-aos="fade-in">Loading...</p>
        )}

        {/* Chart */}
        {weather && chartData && (
          <div className="chart-container" data-aos="fade-up">
            <h3>Temperature Trend (Next Hours)</h3>
            <Line data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
// import React, { useEffect } from 'react'
// import './App.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts } from './features/posts/postSlice';

// const App = () => {
//   const dispatch = useDispatch();

//   const {items, loading, error} = useSelector((state)=>state.products);


//   useEffect(()=>{
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   return (
//     <div>
//       { 
//       items.map((item)=>(
//         <div className=' mt-4'>
//       <p className=' text-3xl '>{item.id}.{item.title}</p>
//       <p className=' text-1xl'>Description: {item.description}</p>
//       <p className='text-1xl '>Price: ${item.price}</p>
//        <p className='text-1xl '>Category: {item.category}</p>
//        <p className='text-1xl '>Discount: {item.discountPercentage}%</p>
//        <p className='text-1xl '>Rating: ${item.rating}</p>
//        <p className='text-1xl '>Brand: {item.brand}</p>
//       </div>
//       ))
      
// }
//     </div>
//   )
// }

// export default App