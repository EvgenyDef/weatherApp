import axios from 'axios';

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=574c020b4a514d5eb0290100252704&q=${city}&aqi=no`
    );
    return response.data.current;
  } catch (error) {
    console.error('Ошибка при запросе погоды:', error);
    throw error;
  }
};

export const fetchHistoryWeather = async () => {
  const data = new Data();
  const now = data.getFullYear() + "." + data.getMonth() + "." + data.getDate()
  try {
    const response = await axios.get(
      'http://api.weatherapi.com/v1/history.json?key=574c020b4a514d5eb0290100252704&q=Samara&dt=${now}'
    );

    
    return response //доделать!!
    
  } catch (error) {
    console.error('Ошибка при запросе погоды:', error);
    throw error; 
  }
};