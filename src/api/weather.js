import axios from 'axios';

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=574c020b4a514d5eb0290100252704&q=${city}&days=1&aqi=no&alerts=no`
    );
    return {
      temp_c: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      maxtemp_c: response.data.forecast.forecastday[0].maxtemp_c,
      mintemp_c: response.data.forecast.forecastday[0].mintemp_c,
      wind_kph: response.data.current.wind_kph,
      wind_degree: response.data.current.wind_degree,
      pressure: response.data.current.pressure_mb,
      precip: response.data.forecast.forecastday[0].totalprecip_mm,
      chance_precip: response.data.forecast.forecastday[0].daily_chance_of_rain,
      sunrise: response.data.forecast.forecastday[0].astro.sunrise,
      sunset: response.data.forecast.forecastday[0].astro.sunset,
    };
  } catch (error) {
    console.error('Ошибка при запросе погоды:', error);
    throw error;
  }
};