import './ShowWeather.css';
import React from 'react';
import { connect } from 'react-redux';
import { convertUTC } from '../helper_functions/helpers';
import ShowHourly from './ShowHourly';
import ShowDaily from './ShowDailyList';

const ShowWeather = ({ weatherData }) => {

    const renderCurrent = () => {
        const {city, state, zip} = weatherData;
        const {current} = weatherData.currentWeather.data;
        const icon = "http://openweathermap.org/img/w/" + current.weather[0].icon + ".png";
        const day = convertUTC(`${current.dt}`, 'weekday', 'long');
        const sunrise = convertUTC(`${current.sunrise}`, 'time', 'short');
        const sunset = convertUTC(`${current.sunset}`, 'time', 'short');
        return (
            <section className="currentDate" key={current.dt}>
                <div className="column50">
                    <div className="location">{`${city}, ${state} ${zip}`}</div>
                    <div className="day">{day}</div>
                    <div className="weatherDescription">{current.weather[0].description}</div>
                    <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                        className="temperature">{`${Math.round(current.temp)}`}</span><span
                        className="degree">&deg;</span><span className="farenheit">{`F`}</span></div>
                </div>
                <div className="column50">
                    <div className="sunTime">{`Sunrise: ${sunrise}`}</div>
                    <div className="sunTime">{`Sunset: ${sunset}`}</div>
                </div>
            </section>
        )
    };

    if (weatherData.error) {
        return (
            <div className="section">
                <h2>Forecast</h2>
                <div className="error centerDiv">There is a problem with the ZIP code entered, please try again</div>
            </div>
        )
    } else if (!weatherData.hasOwnProperty('error')) {
        return (
            <div className="section">
                <h2>Forecast</h2>
                <div className="centerDiv">Waiting for ZIP code</div>
            </div>
        )
    }
    return (
        <div className="section">
            <h2>Forecast</h2>
            <div className="mainCard">
                {renderCurrent()}
                <ShowHourly />
                <ShowDaily />
            </div>
        </div>
    )

};

const mapStateToProps = state => {
    return {
        weatherData: state.currentWeather
    }
};

export default connect(mapStateToProps)(ShowWeather);
