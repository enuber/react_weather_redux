import { combineReducers } from 'redux';
import { GET_WEATHER_DATA } from '../actions/types';

const getWeatherDataReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_WEATHER_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    currentWeather: getWeatherDataReducer
});