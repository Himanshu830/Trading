import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth/api";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => {
    const { user } = isAuthenticated()

    const renderMenu = () => {
        return (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/chat")}
                            to="/chat"
                        >Chat</Link>
                    </li>
                )} */}

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/about")}
                            to="/about"
                        >About Us</Link>
                    </li>
                    <li className="nav-item">
                    <Link
                            className="nav-link"
                            style={isActive(history, "/contact")}
                            to="/contact"
                        >Contact Us</Link>
                    </li>
                </ul>

                <span className="form-inline">
                    {!isAuthenticated() && (
                        <Fragment>
                            <Link
                                to="/signin"
                                style={isActive(history, "/signin")}
                                className="nav-link"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/signup"
                                style={isActive(history, "/signup")}
                                className="nav-link"
                            >
                                Sign up
                            </Link>

                        </Fragment>
                        
                    )}

                    {(user && user.role === 1) && (
                        <Link
                            to="/admin/dashboard"
                            style={isActive(history, "/admin/dashboard")}
                            className="nav-link"
                        >
                            Dashboard
                        </Link>
                    )}

                    {(user && user.role !== 1) && (
                        <Link
                            to="/user/dashboard"
                            style={isActive(history, "/user/dashboard")}
                            className="nav-link"
                        >
                            Dashboard
                        </Link>
                    )}

                    {isAuthenticated() && (
                        <span
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/signin");
                                })
                            }
                        >
                            Signout
                        </span>
                    )}
                </span>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link className="navbar-brand" to='/'>Trading Site</Link>
            {renderMenu()}
        </nav>
    );
};

export default withRouter(Menu);