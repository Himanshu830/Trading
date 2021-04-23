import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { getCompany } from '../company/api';
// import { SuccessMessage, ErrorMessage } from '../message/messages';
// import { Loader } from '../loader/loader';

const AdminDashboard = ({ user, token }) => {
    const [companyName, setCompanyName] = useState('')

    useEffect(() => {
        getCompany(token).then(result => {
            setCompanyName(result.name)
        });
    });

    const { name, email, country, role } = user;
    
    const dashboardHtml = () => {
        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <span className="nav-link" to="/product"><strong>Admin Dashboard</strong></span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {/* <div className="card-body">
                    <h3 className="card-header">User Information</h3> */}
                        <ul className="list-group">
                            <li className="list-group-item"><b>Name</b>: {name}</li>
                            <li className="list-group-item"><b>Email</b>: {email}</li>
                            <li className="list-group-item"><b>Country</b>: {country}</li>
                            <li className="list-group-item">
                                <b>Role</b>: {role === 1 ? "Admin" : "Registered User"}
                            </li>
                        </ul>
                    {/* </div> */}
                </div>
            </div>
        )
    }

    return (
        <Layout>
            {dashboardHtml()}
        </Layout>
    )
};

export default AdminDashboard;