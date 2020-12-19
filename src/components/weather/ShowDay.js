import './ShowDay.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { convertUTC } from '../helper_functions/helpers';

class ShowDay extends React.Component {

    //makes sure that if there is no data, it pushes to home so that there are no errors thrown.
    componentDidMount() {
        if(!this.props.dayWeather.hasOwnProperty('city')) {
            history.push('/');
        }
    }

    //takes in the wind direction as an angle and spits out the wind direction.
    degToCompass(num) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    renderChosenDay() {
        console.log(this.props.dayWeather.weatherForDay);
        if (this.props.dayWeather.hasOwnProperty('city')) {
            const {city, state, zip, weatherForDay} = this.props.dayWeather;
            const icon = "http://openweathermap.org/img/w/" + weatherForDay.weather[0].icon + ".png";
            const day = convertUTC(`${weatherForDay.dt}`, 'weekday', 'long');
            const sunrise = convertUTC(`${weatherForDay.sunrise}`, 'time', 'short');
            const sunset = convertUTC(`${weatherForDay.sunset}`, 'time', 'short');
            const windDirection = this.degToCompass(weatherForDay.wind_deg);
            const windInformation = `${windDirection} ${Math.round(weatherForDay.wind_speed)}mph`;
            console.log(windInformation);
            return (
                <section className="currentDate" key={weatherForDay.dt}>
                    <div className="column50">
                        <div className="location">{`${city}, ${state} ${zip}`}</div>
                        <div className="day">{day}</div>
                        <div className="weatherDescription">{weatherForDay.weather[0].description}</div>
                        <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                            className="temperature">{`${Math.round(weatherForDay.temp.day)}`}</span><span
                            className="degree">&deg;</span><span className="farenheit">{`F`}</span>
                        </div>
                        <div>
                            <span className="temperatureMax">{`Max Temperature: ${Math.round(weatherForDay.temp.max)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F   `}</span>
                        </div>
                        <div>
                            <span className="temperatureMin">{`Min Temperature: ${Math.round(weatherForDay.temp.min)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F`}</span>
                        </div>
                    </div>
                    <div className="column50">
                        <div>{`Clouds: ${Math.round(weatherForDay.clouds)}%`}</div>
                        <div>{`Wind: ${windInformation}`}</div>
                        <div>{`Humidity: ${weatherForDay.humidity}%`}</div>
                        <div>{`Sunrise: ${sunrise}`}</div>
                        <div>{`Sunset: ${sunset}`}</div>
                    </div>
                </section>
            )
        }
    }

    render() {
        return(
            <div className="section">
                <h2>Forecast</h2>
                <div className="dayContainer">
                    {this.renderChosenDay()}
                </div>
                <Link to={`/`} className="button">Back To Current Weather</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dayWeather: state.showDaily
    }
};

export default connect(mapStateToProps)(ShowDay);