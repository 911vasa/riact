import axios from 'axios';

const API_KEY  = "8c17646feea25a529fe0f6a0cd12388b";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER ="FETCH_WEATHER";

export  function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request =  axios.get(url);
    console.log(request.PromiseValue , 'new york')
    return{
        type: FETCH_WEATHER,
        payload:request
    };
}
