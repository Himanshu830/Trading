import React from "react";
// import Menu from "./Menu";
import Navigation from './Navigation';
import { isAuthenticated } from '../auth/api';
import './style.css';

const Layout = ({
    title = "Title",
    description = "Description",
    className,  
    children,
    showSidebar = false
}) => {

    const displayFullWidthHtml = () => (
        <div className={className} style={{paddingTop: '25px'}}>
            {children}
        </div>
    );

    const displayHalfHtml = () => {
        const { user: { _id } } = isAuthenticated();
        return (
            <div className="row">
                <Navigation userId={_id}/>
                <div className="col-9">{children}</div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Menu />
            <div className={className} style={{paddingTop: '25px'}}>
                { (showSidebar) ? displayHalfHtml() : displayFullWidthHtml() }
            </div>
        </React.Fragment>
    )
    
}
export default Layout;
