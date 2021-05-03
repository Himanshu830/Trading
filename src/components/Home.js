import React, { Fragment } from 'react';
import Menu from './layout/partial/Menu';


const Home = () => {
    return (
        <Fragment>
            <Menu />
            <div className="home-page">
                <h1>You are on Home page.</h1>
            </div>
        </Fragment>
    )
};

export default Home;