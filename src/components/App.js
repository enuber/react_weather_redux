import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import ShowWeather from './weather/ShowWeather';
import ShowDay from './weather/ShowDay';
import Header from './Header';
import ZipcodeInput from './Zipcode_Input';

const App = () => {
    return(
        <div className="ui container" style={{marginTop: '10px'}}>
            <Router history={history}>
                <Header/>
                <ZipcodeInput/>
                <Switch>
                    <Route path="/apps/weather_react_redux/" exact component={ShowWeather}  />
                    <Route path="/apps/weather_react_redux/:day" component={ShowDay}  />
                </Switch>
            </Router>
        </div>
    )
};

export default App;