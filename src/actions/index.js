import Geocode from 'react-geocode';
import openweatherOnecall from '../apis/openweatherOneCall';
import { GET_WEATHER_DATA, SHOW_DAILY } from './types';
import history from '../history';
import Keys from '../config.json';

//makes a call to google to get lng/lat for getting weather. Based on success/failure will make a call to get
//weather before finally dispatching the data.
export const getWeatherData = zipcode => async dispatch => {
    let data = {
        currentWeather: {},
        lat: null,
        lng: null,
        city: null,
        state: null,
        zip: zipcode,
        error: true
    };
    //begin by getting the information we need from google API. Specifically needed for weather API is
    //the lat/lng.
    Geocode.setApiKey(Keys.keys[0].google);
    await Geocode.fromAddress(zipcode).then(
        response => {
            const {lat, lng} = response.results[0].geometry.location;
            const city = response.results[0].address_components[1].long_name;
            const state = response.results[0].address_components[3].short_name;
            data = {
                lat: lat,
                lng: lng,
                city: city,
                state: state,
                zip: zipcode,
                error: false
            };
        },
        error => {
            dispatch({
                type: GET_WEATHER_DATA,
                payload: data
            })
            history.push('/apps/weather_react_redux/');
        }
    );
    //using the data retrieved from Google API, making the call to the weather API.
    //using the error as well so that this call doesn't get made
    if (!data.error) {
        const response = await openweatherOnecall.get('', {
            params: {
                lat: data.lat,
                lon: data.lng,
                exclude: "minutely",
                units: "imperial",
                appid: Keys.keys[0].openweather
            }
        });
        data = {...data, currentWeather: response};
        dispatch({
            type: GET_WEATHER_DATA,
            payload: data
        });
        history.push('/apps/weather_react_redux/');
    }
};

export const showDailyWeather = (weatherForDay={}, day=null, city=null, state=null, zip=null) => {
    const data = {
        weatherForDay,
        city,
        state,
        zip
    };
    return {
        type: SHOW_DAILY,
        payload: data
    };
};