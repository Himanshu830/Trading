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
    const renderMenu = () => {
        return (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/chat")}
                            to="/chat"
                        >Chat</Link>
                    </li>
                )}

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/about")}
                            to="/about"
                        >About</Link>
                    </li>
                    <li className="nav-item">
                    <Link
                            className="nav-link"
                            style={isActive(history, "/contact")}
                            to="/contact"
                        >Contact</Link>
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

                    {isAuthenticated() && (
                        <span
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/");
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
            <Link className="navbar-brand" to='/'>Business</Link>
            {renderMenu()}
        </nav>
    );
};

export default withRouter(Menu);