import './ShowDailyList.css';
import React from 'react'
import { convertUTC } from '../helper_functions/helpers';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showDailyWeather } from '../../actions';

class ShowDaily extends React.Component {

    //a check to see as the days are being mapped, if it's the current day that it adds an active class
    //to allow the day to stand out in the list.
    checkActive = day => {
        const {daily} = this.props.weatherData.currentWeather.data;
        if (day.dt === daily[0].dt) {
            return 'activeDay';
        }
    };

    renderDailyList = () => {
        const { daily } = this.props.weatherData.currentWeather.data;
        const { city, state, zip } = this.props.weatherData;
        return daily.map( currentDay => {
            const day = convertUTC(`${currentDay.dt}`, 'weekday', 'short');
            const icon = "http://openweathermap.org/img/w/"+ currentDay.weather[0].icon +".png";
            const maxTemp = Math.round(currentDay.temp.max);
            const minTemp = Math.round(currentDay.temp.min);
            const isActive = this.checkActive(currentDay);
            return (
                <Link
                    to={`/${day}`}
                    className={`dailyContainer ${isActive}`}
                    key={currentDay.dt}
                    onClick={()=> this.props.showDailyWeather(currentDay, day, city, state, zip)}
                >
                    <h5>{day}</h5>
                    <img className="weatherIconDaily" src={`${icon}`} alt="weather icon" />
                    <h5><span className="darkenText">{maxTemp}&deg;{`F `}</span>{minTemp}&deg;{`F`}</h5>
                </Link>
            )
        });
    };

    render() {
        return (
            <div className="dailyList">
                {this.renderDailyList()}
            </div>
        )
    }

};

const mapStateToProps = state => {
    return {
        weatherData: state.currentWeather
    }
};



export default connect(mapStateToProps, { showDailyWeather })(ShowDaily);