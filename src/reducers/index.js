import { combineReducers } from 'redux';
import showDaily from './showDailyWeatherReducer';
import getWeatherData from './getWeatherDataReducer';


export default combineReducers({
    currentWeather: getWeatherData,
    showDaily: showDaily
});