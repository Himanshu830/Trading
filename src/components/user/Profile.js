import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';
import { update, updateUser } from '../user/api';

const Profile = ({ user, token }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        loading: false,
        error: '',
        success: ''
    });

    useEffect(() => {
        setValues({ ...values, ...user})
    }, []);

    const countryList = [
        {_id: 1, name: 'India'},
        {_id: 2, name: 'USA'},
        {_id: 3, name: 'Canada'},
        {_id: 4, name: 'UK'}
    ];

    const { name, email, password, country, loading, error, success } = values;

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: false });
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true })

        update(user._id, token, { name, email, password, country }).then(data => {
            if (data.error) {
                console.log(data.error)
                setValues({ ...values, error: data.error, loading: false, success: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        // company: data.company,
                        country: data.country,
                        loading: false,
                        success: 'Profile updated successfully.'
                    });
                });
            }
        });
    };

    const showLoader = () => ( loading && <Loader /> )
    const showError = () => ( error && <ErrorMessage message={ error} /> );
    const showSuccess = () => ( success && <SuccessMessage message={success} /> );

    const profileHtml = () => {
        return (
            <div className="col-sm-9">
                <div className="card">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <span className="nav-link" to="/product"><strong>Update Profile</strong></span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="card-body">
                        <form>
                            { showLoader() }

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    { showError() }
                                    { showSuccess() }
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
                                </div>
                                <div className="form-group col-md-6"></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" onChange={handleChange('email')} className="form-control" value={email} readOnly />
                                </div>
                                <div className="form-group col-md-6"></div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
                                </div>
                                <div className="form-group col-md-6"></div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Country</label>
                                    <select onChange={handleChange('country')} className="form-control" value={country}>
                                        <option>Select Country</option>
                                        {countryList &&
                                            countryList.map((c) => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6"></div>
                            </div>
                            <button onClick={clickSubmit} type="submit" className="btn btn-primary">Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            {profileHtml()}
        </Layout>
    )
};

export default Profile;