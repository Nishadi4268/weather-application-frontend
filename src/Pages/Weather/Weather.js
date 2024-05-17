import React, { useState } from 'react';
import './Weather.css';
import video1 from './Images/video1.mp4'; // Adjust the path according to your project structure

const Weather = () => {
    const [latitude, setLatitude] = useState('6.9271'); //Colombo
    const [longitude, setLongitude] = useState('79.8612'); 

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [showFullForecast, setShowFullForecast] = useState(false);

    const handleLatitudeChange = (event) => {
        setLatitude(event.target.value);
    };

    const handleLongitudeChange = (event) => {
        setLongitude(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!latitude || !longitude) {
            alert('Please enter both latitude and longitude.');
            return;
        }
    
        try {
            const API_KEY = '83195ecbf983b50b9586fd4db33b5d33';

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);
    
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            if (!forecastResponse.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            const forecastData = await forecastResponse.json();
            setForecastData(forecastData);
        } catch (error) {
            console.error(error);
            alert('Error fetching weather data. Please try again later.');
        }
    };

    const handleViewMore = () => {
        setShowFullForecast(true);
    };

    return (
        <div className="weather-container">
            <video className="background-video" autoPlay loop muted>
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1 className='topic1'>Today's Weather in Colombo...</h1>
            <h2 className='description1'>Press search button to see the wether information of Colombo...</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Latitude:
                    <input type="text" value={latitude} onChange={handleLatitudeChange} />
                </label>
                <label>
                    Enter Longitude:
                    <input type="text" value={longitude} onChange={handleLongitudeChange} />
                </label>
                <button type="submit">Search</button>
            </form>
            {weatherData && weatherData.main && (
                <div className="weather-info">
                    <h2>Today's Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        
            {forecastData && forecastData.list && (
                <div className="forecast-info">
                    <h2>Next Three Days Forecast</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Temperature (°C)</th>
                                    <th>Weather</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showFullForecast
                                    ? forecastData.list.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.dt_txt.substring(0, 10)}</td>
                                            <td>{item.dt_txt.substring(11, 19)}</td>
                                            <td>{item.main.temp}</td>
                                            <td>{item.weather[0].description}</td>
                                        </tr>
                                    ))
                                    : forecastData.list.slice(0, 8).map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.dt_txt.substring(0, 10)}</td>
                                            <td>{item.dt_txt.substring(11, 19)}</td>
                                            <td>{item.main.temp}</td>
                                            <td>{item.weather[0].description}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleViewMore}>View More</button>
                </div>
            )}

            {weatherData && weatherData.main && (
                <div className="weather-bottom">
                    <h2>Weather Details for {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
