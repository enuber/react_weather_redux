import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header';

const App = () => {
    return(
        <div className="ui container" style={{marginTop: '10px'}}>
            <Router history={history}>
                <Header/>
                App
            </Router>
        </div>
    )
};

export default App;