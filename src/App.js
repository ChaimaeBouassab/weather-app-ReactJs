import React, { useEffect, useState } from 'react';


const Weather = () => {
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [chosenTemperature, setChosenTemperature] = useState(null);
  const [inputCity, setInputCity] = useState('');
  const [currentCity, setCurrentCity] = useState('Casablanca');
  const [isTemperatureInFahrenheit, setIsTemperatureInFahrenheit] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');

  const apiKey =  '38118e61983140d2b69163822231507'

  useEffect(() => {
    const defaultLocationUrl = `http://api.weatherapi.com/v1/current.json?key=38118e61983140d2b69163822231507&q=${currentCity}&aqi=no`;
    fetchWeatherData(defaultLocationUrl);
  }, [apiKey, currentCity]);

  const handleCityInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setCurrentCity(inputCity);
    setIsTemperatureInFahrenheit(false);
    setTemperatureUnit('Celsius');
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=38118e61983140d2b69163822231507&q=${currentCity}&aqi=no`;
    fetchWeatherData(apiUrl);
  };

  const handleTemperatureUnitToggle = (e) => {
    setIsTemperatureInFahrenheit(e.target.checked);

    if (!isTemperatureInFahrenheit) {
      setChosenTemperature(currentTemperature);
      setTemperatureUnit('Celsius');
    } else {
      setChosenTemperature(currentTemperature);
      setTemperatureUnit('Fahrenheit');
    }
  };

  const fetchWeatherData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      setCurrentTemperature(data.current.temp_c);
      setChosenTemperature(data.current.temp_c);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="City"
        onChange={handleCityInputChange}
        value={inputCity}
      />
      <button onClick={handleSearchButtonClick}   className="fa fa-search"> Find </button>
      <h1>
        <span>City: {currentCity}</span>
      </h1>
      <p className='temp'>
       Temperature: {chosenTemperature}
        <sup>  °{temperatureUnit}</sup>
      </p>
      <input
        className="checkbox"
        type="checkbox"
        onChange={handleTemperatureUnitToggle}
        checked={isTemperatureInFahrenheit}
      />
    </>
  );
};

export default Weather;
