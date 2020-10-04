import React from 'react';
import { connect } from 'react-redux';
import { getWeatherData } from '../actions';

class Zipcode_Input extends React.Component {

    state = {
        zipcode: ''
    };

    //extra protection to make sure number is an integer
    isInt = currentZip => {
        return (parseFloat(currentZip) === parseInt(currentZip) && !isNaN(currentZip))
    };

    onFormSubmit = async e => {
        e.preventDefault();
        const { zipcode } = this.state;
        if ((zipcode.length === 5) && (this.isInt(zipcode))) {
            await this.props.getWeatherData(zipcode);
            this.setState({zipcode: ''})
        }
    };


    render() {
        return (
            <div className="ui segement">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Enter ZIP Code</label>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            maxLength="5"
                            value={this.state.zipcode}
                            onChange={(e)=>this.setState({ zipcode: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.currentWeather
    }
};

export default connect(mapStateToProps, { getWeatherData })(Zipcode_Input);