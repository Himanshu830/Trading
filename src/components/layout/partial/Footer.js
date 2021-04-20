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

const style = {
   position: "fixed",
   left: "0px",
   bottom: "0px",
   width: "100%",
   backgroundColor: "black",
   color: "white",
   textAlign: "center",
}

const Footer = ({ history }) => {
    return (
        <footer className="page-footer font-small blue" style={style}>
            <div className="footer-copyright text-center py-3">© 2021 Copyright:
                <Link to="/"> Trading Site</Link>
            </div>
        </footer>
    )
};

export default withRouter(Footer);