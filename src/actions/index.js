import { GET_WEATHER_DATA } from './types';

export const getWeatherData = zip => {
    return {
        type: GET_WEATHER_DATA,
        payload: zip
    }
};