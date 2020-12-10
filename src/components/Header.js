import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/apps/weather_react_redux/" className="item">
                Get Weather - Using React with Redux
            </Link>
            <div className="right menu">
                <Link to="/apps/weather_react_redux/" className="item">Home</Link>
            </div>
        </div>
    )
};

export default Header;