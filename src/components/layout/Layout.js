import React, { Fragment } from 'react';
import Menu from './partial/Menu';
import Footer from './partial/Footer';
import Sidebar from './partial/Sidebar';
import { isAuthenticated } from '../auth/api';

const Layout = ( props ) => {
    const logedInHtml = () => (
        <div className="container-fluid" style={{marginTop: '15px'}}>
            <div className="row">
                <Sidebar  />
                { props.children }
            </div>
        </div>
    )

    return (
        <Fragment>
           <Menu />
           { isAuthenticated() && logedInHtml() }
           <Footer />
        </Fragment>
    )   
}

export default Layout;