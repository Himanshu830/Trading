import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../layout/Layout';
import { Loader } from '../loader/loader';
import { update, updateUser } from '../user/api';
import { CountryList } from '../constant';
import ErrorModal from '../modal/ErrorModal';
import SuccessModal from '../modal/SuccessModal';

const UpdateProfile = ({ user, token }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        loading: false,
        error: '',
        success: '',
        errorModal: false,
        successModal: false
    });

    useEffect(() => {
        setValues({ ...values, ...user})
    }, []);

    const { name, email, password, country, loading } = values;

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: false });
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true })

        update(user._id, token, { name, email, password, country }).then(data => {
            if (data.error) {
                console.log(data.error)
                setValues({ ...values, errorModal: true, error: data.error, loading: false, success: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        // company: data.company,
                        country: data.country,
                        loading: false,
                        success: 'Profile updated successfully.',
                        successModal: true
                    });
                });
            }
        });
    };

    const showLoader = () => ( loading && <Loader /> )

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
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
                                </div>
                                <div className="form-group col-md-6"></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
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
                                    <select value={country} onChange={handleChange('country')} className="form-control">
                                    <option>Select Country</option>
                                    {Object.values(CountryList).map((c) => (
                                        <option key={c} value={c}>
                                            {c}
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

    const onClose = () => {
        setValues({errorModal: false, error: ''});
    }

    return (
        <Layout>
            <Fragment>
            {profileHtml()}
                { values.successModal && 
                    <SuccessModal
                        title="Success"
                        content= { values.success }
                        redirectUrl= {`/profile`}
                        isDisplay={values.successModal}
                    />
                }

                { values.errorModal && 
                    <ErrorModal
                        title="Error"
                        content= { values.error }
                        isDisplay={values.errorModal}
                        onSubmit={onClose}
                    />
                }
            </Fragment>            
        </Layout>
    )
};

export default UpdateProfile;