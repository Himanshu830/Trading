import React from 'react';
import { Redirect, Link } from "react-router-dom";
import Layout from '../layout/Layout';
const Profile = ({ user, token }) => {

    const profileHtml = () => {
        if(!user) {
            return <Redirect to="/signin" />;
        }

        const { name, email, country } = user
        return (  
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <span className="nav-link" to="/order"><strong>Profile</strong></span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-2"><b>Name</b>:</div>
                                <div className="col-sm-6">{name}</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-2"><b>Email</b>:</div>
                                <div className="col-sm-6">{email}</div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-2"><b>Country</b>:</div>
                                <div className="col-sm-6">{country}</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-2">
                                    <Link to={`/profile/${user._id}`} type="button" className="btn btn-sm btn-outline-primary">Update</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <Layout>
            {profileHtml()}
        </Layout>
    )
};

export default Profile;