import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../auth/api';

const isActive = (history, path) => {
    if (history && history.location.pathname === path) {
        return 'active';
    } else {
        return '';
    }  
};

const Sidebar = ({ history }) => {
    const sidebarHtml = () => {
        return (
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <Link 
                        to="/user/dashboard"
                        className={`nav-link ${ isActive(history, "/user/dashboard") }`} 
                        data-toggle="pill"
                        role="tab"
                        aria-controls="v-pills-home">Dashboard</Link>
                )} */}
                
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <Fragment>
                        {/* <Link 
                            to="/admin/dashboard"
                            className={`nav-link ${ isActive(history, "/admin/dashboard") }`} 
                            data-toggle="pill"
                            role="tab"
                            aria-controls="v-pills-home">Dashboard</Link> */}                        

                        <Link 
                            to="/profile"
                            className={`nav-link ${ isActive(history, "/profile") }`} 
                            data-toggle="pill"
                            role="tab"
                            aria-controls="v-pills-home">Admin Profile</Link>

                        <Link 
                            to="/admin/category"
                            className={`nav-link ${ isActive(history, "/admin/category") }`} 
                            data-toggle="pill"
                            role="tab"
                            aria-controls="v-pills-home">Category</Link>
                        
                        <Link 
                            to="/admin/users"
                            className={`nav-link ${ isActive(history, "/admin/users") }`} 
                            data-toggle="pill"
                            role="tab"
                            aria-controls="v-pills-home">Users</Link>

                    </Fragment>                    
                )}

                {isAuthenticated() && isAuthenticated().user.role !== 1 && (
                    <Fragment>
                        <Link 
                            to="/profile"
                            className={`nav-link ${ isActive(history, "/profile") }`} 
                            data-toggle="pill"
                            role="tab"
                            aria-controls="v-pills-home">Profile</Link>
                    </Fragment>
                )}
                
                <Link to="/company" className={`nav-link ${ isActive(history, "/company") }`} data-toggle="pill" role="tab" aria-controls="v-pills-profile">Company</Link>
                <Link to="/product" className={`nav-link ${ isActive(history, "/product") }`} data-toggle="pill" role="tab" aria-controls="v-pills-messages">Products</Link>
                <Link to="/order" className={`nav-link ${ isActive(history, "/order") }`} data-toggle="pill" role="tab" aria-controls="v-pills-settings">Orders</Link>
                <Link to="/chat" className={`nav-link ${ isActive(history, "/chat") }`} data-toggle="pill" role="tab" aria-controls="v-pills-settings">Chat</Link>
            </div>
        )
    }

    return (
        <div className="col-sm-3">
            { sidebarHtml() }
            <hr className="d-sm-none" />
        </div>
    );
};

export default withRouter(Sidebar);