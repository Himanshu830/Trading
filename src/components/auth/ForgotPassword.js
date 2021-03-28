import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../layout/partial/Menu';
import { recoverPassword } from '../auth/api';
import { SuccessMessage, ErrorMessage } from '../message/messages';
import { Loader } from '../loader/loader';

import './auth.css';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        loading: false,
        error: '',
        success: ''
    });

    const { email, loading, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: false });
        recoverPassword(email).then(data => {
            console.log(data)
            if (data.error) {
                return setValues({ ...values, loading: false, error: data.error });
            } else if(!data.success) {
                return setValues({ ...values, loading: false, error: data.message });
            } else {
                setValues({
                    ...values,
                    email: '',
                    loading: false,
                    error: '',
                    success: 'Password reset link has been sent on your email.'
                });
            }
        });
    };

    const showLoader = () => ( loading && <Loader /> )
    const showError = () => ( error && <ErrorMessage message={ error} /> );
    const showSuccess = () => ( success && <SuccessMessage message={success} /> );

    const forgotPasswordHtml = () => (
        <div className="login-wrapper">
            <div className="card bg-light mb-3 wrapper-box">
                <div className="card-header"><h5>Forgot Password</h5></div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                onChange={handleChange('email')}
                                value={values.email}
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        
                        <div className="form-group">
                            <button onClick={handleSubmit} className="btn btn-outline-primary w-100">Reset Password</button>
                        </div>
                        <div className="text-center">
                            <small>or </small><Link to="/signin">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <Fragment>
            <Menu />
            { showLoader() }
            { showError() }
            { showSuccess() }
            { forgotPasswordHtml() }
        </Fragment>
    )
};

export default ForgotPassword;